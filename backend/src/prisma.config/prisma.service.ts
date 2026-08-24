import "dotenv/config";
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    // 1. Pass a structured configuration object using your explicit .env variables
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || '',
    });

    // 2. Forward the configured adapter instance to the parent constructor
    super({ adapter });
  }

  // Automated lazy-connection handling by the adapter layer
  async onModuleInit() {
    // Keep empty: do not use this.$connect() with JavaScript driver adapters
  }

  // Automated pool destruction handling by the adapter layer
  async onModuleDestroy() {
    // Keep empty: do not use this.$disconnect() with JavaScript driver adapters
  }
}