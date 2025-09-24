/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // optional: log queries for debugging
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('🟢 Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔴 Prisma disconnected');
  }

  /**
   * Optional: global helper to run raw queries safely
   */
  async runRawQuery<T = any>(query: string): Promise<T[]> {
    return this.$queryRawUnsafe(query) as Promise<T[]>;
  }
}
