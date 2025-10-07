/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  doctorId?: number; // <-- made optional for auto-assignment

  @ApiProperty({ example: '2025-09-24T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ example: '1 hr' })
  @IsInt()
  duration: number;

  @ApiProperty({ example: 'Follow-up', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 100.0, required: false })
  @IsOptional()
  @IsNumber()
  costs?: number;

  @ApiProperty({ example: 'invoice.pdf', required: false })
  @IsOptional()
  @IsString()
  invoice?: string;

  @ApiProperty({ example: 'Checkup description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://meet.jit.si/abc123', required: false })
  @IsOptional()
  @IsUrl()
  meetingLink?: string; // <-- optional meeting link
}
