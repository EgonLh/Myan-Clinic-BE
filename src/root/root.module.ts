import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { RootService } from './root.services';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RootService],
  controllers: [RootController],
})
export class RootModule {}
