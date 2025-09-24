/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDepartmentDto } from './dtos/create.department.dto';
import { UpdateDepartmentDto } from './dtos/update.department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateDepartmentDto) {
    return this.prisma.department.create({ data: dto });
  }

  findAll() {
    return this.prisma.department.findMany({ include: { doctors: true } });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({
      where: { id },
      include: { doctors: true },
    });
  }

  update(id: number, dto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }
}
