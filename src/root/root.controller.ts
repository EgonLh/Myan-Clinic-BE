/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateRootDto } from './dtos/create.root.dto';
import { RootService } from './root.services';
import { UpdateRootDto } from './dtos/update.root.dto';

@ApiTags('roots')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roots')
export class RootController {
  constructor(private rootService: RootService) {}

  @ApiOperation({ summary: 'Create root/admin' })
  @Post()
  create(@Body() dto: CreateRootDto) {
    return this.rootService.create(dto);
  }

  @ApiOperation({ summary: 'Update root/admin' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRootDto) {
    return this.rootService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Get all roots/admins' })
  @Get()
  findAll() {
    return this.rootService.findAll();
  }

  @ApiOperation({ summary: 'Get root/admin by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rootService.findOne(+id);
  }
}
