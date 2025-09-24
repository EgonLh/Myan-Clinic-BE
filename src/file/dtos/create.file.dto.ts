/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  storageId: number;

  @ApiProperty({ example: 'report.pdf' })
  @IsString()
  filename: string;

  @ApiProperty({ example: 'Uploaded by doctor', required: false })
  @IsOptional()
  @IsString()
  log?: string;
}
