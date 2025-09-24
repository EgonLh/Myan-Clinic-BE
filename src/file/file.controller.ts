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
import { FileService } from './file.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateFileDto } from './dtos/create.file.dto';
import { UpdateFileDto } from './dtos/update.file.dto';

@ApiTags('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FileController {
  constructor(private service: FileService) {}

  @ApiOperation({ summary: 'Create file record' })
  @Post()
  create(@Body() dto: CreateFileDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Update file record' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFileDto) {
    return this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Get all files' })
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
