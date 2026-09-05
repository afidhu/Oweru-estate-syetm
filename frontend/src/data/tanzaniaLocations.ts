import type { LookupItem } from '../types'
import raw from './tanzania-locations.json'

interface RawLocationRow {
  region: string
  district: string
  ward: string
}

const rows = raw as RawLocationRow[]

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const regionMap = new Map<string, LookupItem>()
const districtMap = new Map<string, LookupItem & { regionId: string }>()
const wardMap = new Map<string, LookupItem & { districtId: string }>()

for (const row of rows) {
  const regionId = slugify(row.region)
  if (!regionMap.has(regionId)) regionMap.set(regionId, { id: regionId, name: row.region })

  const districtId = `${regionId}__${slugify(row.district)}`
  if (!districtMap.has(districtId)) districtMap.set(districtId, { id: districtId, name: row.district, regionId })

  const wardId = `${districtId}__${slugify(row.ward)}`
  if (!wardMap.has(wardId)) wardMap.set(wardId, { id: wardId, name: row.ward, districtId })
}

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)

export const staticRegions: LookupItem[] = [...regionMap.values()].sort(byName)
export const staticDistricts: (LookupItem & { regionId: string })[] = [...districtMap.values()].sort(byName)
export const staticWards: (LookupItem & { districtId: string })[] = [...wardMap.values()].sort(byName)
