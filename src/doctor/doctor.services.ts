/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDoctorDto } from './dtos/create.doctor.dto';
import { UpdateDoctorDto } from './dtos/update.doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(uid: number, dto: CreateDoctorDto) {
    return this.prisma.doctor.create({
      data: { ...dto, uid },
    });
  }

  async findAll() {
    return this.prisma.doctor.findMany({
      include: { user: true, department: true },
    });
  }

  async findOne(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true, department: true },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: number, dto: UpdateDoctorDto) {
    return this.prisma.doctor.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.doctor.delete({ where: { id } });
  }
}
