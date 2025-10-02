/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateDepartmentDto } from './dtos/create.department.dto';
import { UpdateDepartmentDto } from './dtos/update.department.dto';

@ApiTags('departments')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private service: DepartmentService) {}

  @ApiOperation({ summary: 'Create a department' })
  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get all departments' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get department by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a department' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Delete a department' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
