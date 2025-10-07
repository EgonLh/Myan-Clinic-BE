/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  ph: string;

  @IsString()
  addr: string;

  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  payment?: string;
}
