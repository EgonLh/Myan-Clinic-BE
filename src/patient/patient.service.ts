/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePatientDto } from './dtos/create.patient';
import { UpdatePatientDto } from './dtos/update.patient';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(uid: number, dto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: { ...dto, uid },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: number, dto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
