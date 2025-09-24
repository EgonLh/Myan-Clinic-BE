/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  ph: string;

  @IsString()
  license: string;

  @IsString()
  type: 'Generalist' | 'Specialist';

  @IsNumber()
  departmentId: number;
}
