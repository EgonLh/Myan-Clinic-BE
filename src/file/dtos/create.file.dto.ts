/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  storageId: number;

  @ApiProperty({
    description: 'Optional description or log for the file',
    example: 'Uploaded by doctor',
    required: false,
  })
  @IsOptional()
  @IsString()
  log?: string;
}
