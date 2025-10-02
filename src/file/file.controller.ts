/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CreateFileDto } from './dtos/create.file.dto';
import { UpdateFileDto } from './dtos/update.file.dto';
import { Express } from 'express';

@ApiTags('files')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('files')
export class FileController {
  constructor(private service: FileService) { }

  @ApiOperation({ summary: 'Create file record' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload with optional log',
    type: CreateFileDto,
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File, // <-- here
  ) {
    return this.service.createWithFile(dto, file);
  }

  @ApiOperation({ summary: 'Update file record or replace file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File update with optional new file upload',
    type: UpdateFileDto,
  })
  @Patch('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFileDto,
    @UploadedFile() file?: Express.Multer.File, // <-- optional
  ) {
    return this.service.updateWithFile(+id, dto, file);
  }

  @ApiOperation({ summary: 'Get all files' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get all files by storage id' })
  @Get('storage/:id/files')
  getFilesByStorage(@Param('id') id: string) {
    return this.service.getFilesByStorageId(Number(id));
  }
}
