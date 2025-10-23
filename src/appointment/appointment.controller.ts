/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dtos/create.appointment.dto';
import { UpdateAppointmentDto } from './dtos/update.appointment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentController {
  constructor(private service: AppointmentService) { }

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

  @ApiOperation({ summary: 'Upload invoice for appointment' })
  @Patch(':id/upload-invoice')
  @UseInterceptors(FileInterceptor('invoice', {
    storage: diskStorage({
      destination: './uploads/invoices', // folder where files will be stored
      filename: (req, file, callback) => {
        // customize file name: e.g., appointment-1234.pdf
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `appointment-${uniqueSuffix}${ext}`);
      },
      }),
  }))
  uploadInvoice(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Invoice file is required');
    }

    console.log('Stored file:', file); // contains path, filename, etc.

    // Save the relative path in database
    // const filePath = file.path; // e.g., uploads/invoices/appointment-123456.pdf
    return this.service.uploadInvoice(+id, file);
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
