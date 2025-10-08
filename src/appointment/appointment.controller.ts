import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dtos/create.appointment.dto';
import { UpdateAppointmentDto } from './dtos/update.appointment.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentController {
  constructor(private service: AppointmentService) {}

  @ApiOperation({ summary: 'Create an appointment' })
  @Post()
  @UseInterceptors(FileInterceptor('invoice'))
  create(
    @Body() dto: CreateAppointmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) dto.invoice = file.filename; // store file path
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get all appointments' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get appointment by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @ApiOperation({ summary: 'Update appointment' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Get appointments by patient ID' })
  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(+patientId);
  }

  @ApiOperation({ summary: 'Get appointments by doctor ID' })
  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findByDoctor(+doctorId);
  }
}
