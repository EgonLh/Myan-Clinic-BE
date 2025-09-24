import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create.patient';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
