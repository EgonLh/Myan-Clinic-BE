/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateStorageDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  patientId: number;
}
