/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  ph: string;

  @IsNumber()
  uid: number;

  @IsNumber()
  age: number;

  @IsString()
  addr: string;

  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  payment?: string;
}
