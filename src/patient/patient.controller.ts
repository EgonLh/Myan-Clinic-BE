/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/create.patient';
import { UpdatePatientDto } from './dtos/update.patient';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @UseGuards(JwtAuthGuard)
@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) { }

  @ApiOperation({ summary: 'Get a patient by ID' })
  @Post()
  create( @Body() dto: CreatePatientDto) {
    return this.patientService.create(dto.uid, dto);
  }

  @ApiOperation({ summary: 'Get a patient by ID' })
  @Get()
  findAll() {
    return this.patientService.findAll();
  }
  @ApiOperation({ summary: 'Get a patient by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }
  @ApiOperation({ summary: 'Get a patient by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientService.update(+id, dto);
  }
  @ApiOperation({ summary: 'Get a patient by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
