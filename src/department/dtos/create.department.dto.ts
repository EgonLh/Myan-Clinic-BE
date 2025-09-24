/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Handles heart patients', required: false })
  @IsOptional()
  @IsString()
  remark?: string;

  // eslint-disable-next-line prettier/prettier
  @ApiProperty({ example: 'Department for heart-related treatments', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
