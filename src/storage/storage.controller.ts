/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateStorageDto } from './dtos/create.storage.dto';
import { StorageService } from './storage.service';
import { UpdateStorageDto } from './dtos/update.storage.dto';

@ApiTags('storage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('storage')
export class StorageController {
  constructor(private service: StorageService) {}

  @ApiOperation({ summary: 'Create storage record' })
  @Post()
  create(@Body() dto: CreateStorageDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Update storage record' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStorageDto) {
    return this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Get all storage records' })
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
