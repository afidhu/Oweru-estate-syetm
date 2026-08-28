const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { parse } = require('csv-parse/sync');
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || '',
});
const prisma = new PrismaClient({ adapter });
const dataDirectory = path.join(__dirname, 'location-data');
const acronyms = new Set(['CBD', 'NIDA', 'GPS', 'TIN']);

function displayName(value) {
  if (!value) return '';
  return value
    .replace(/\r?\n/g, ' ')
    .replace(/-/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => acronyms.has(word.toUpperCase()) ? word.toUpperCase() : `${word[0]?.toUpperCase() || ''}${word.slice(1).toLowerCase()}`)
    .join(' ');
}

async function seedLocations() {
  const regions = new Map((await prisma.region.findMany()).map((item) => [item.name.toLowerCase(), item]));
  const districts = new Map((await prisma.district.findMany()).map((item) => [`${item.regionId}:${item.name.toLowerCase()}`, item]));
  const wards = new Map((await prisma.ward.findMany()).map((item) => [`${item.districtId}:${item.name.toLowerCase()}`, item]));
  let createdRegions = 0;
  let createdDistricts = 0;
  let createdWards = 0;

  for (const fileName of fs.readdirSync(dataDirectory).filter((file) => file.endsWith('.csv'))) {
    const rows = parse(fs.readFileSync(path.join(dataDirectory, fileName)), {
      columns: (headers) => headers.map((header) => header.trim().toLowerCase()),
      skip_empty_lines: true,
      relax_column_count: true,
    });
    const firstRow = rows[0];
    if (!firstRow) continue;

    const regionName = displayName(firstRow.region);
    if (!regionName) continue;
    let region = regions.get(regionName.toLowerCase());
    if (!region) {
      region = await prisma.region.create({ data: { name: regionName } });
      regions.set(regionName.toLowerCase(), region);
      createdRegions += 1;
    }

    const districtNames = new Set(rows.map((row) => displayName(row.district)).filter(Boolean));
    for (const districtName of districtNames) {
      const districtKey = `${region.id}:${districtName.toLowerCase()}`;
      let district = districts.get(districtKey);
      if (!district) {
        district = await prisma.district.create({ data: { name: districtName, regionId: region.id } });
        districts.set(districtKey, district);
        createdDistricts += 1;
      }

      const wardNames = new Set(rows.filter((row) => displayName(row.district) === districtName).map((row) => displayName(row.ward)).filter(Boolean));
      for (const wardName of wardNames) {
        const wardKey = `${district.id}:${wardName.toLowerCase()}`;
        if (!wards.has(wardKey)) {
          const ward = await prisma.ward.create({ data: { name: wardName, districtId: district.id } });
          wards.set(wardKey, ward);
          createdWards += 1;
        }
      }
    }
  }

  console.log(`Location seed complete: ${createdRegions} regions, ${createdDistricts} districts, ${createdWards} wards added.`);
}

seedLocations()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
