/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRootDto } from './dtos/create.root.dto';
import { UpdateRootDto } from './dtos/update.root.dto';

@Injectable()
export class RootService {
  constructor(private prisma: PrismaService) { }

  create(dto: CreateRootDto) {
    return this.prisma.root.create({ data: dto });
  }

  update(id: number, dto: UpdateRootDto) {
    return this.prisma.root.update({
      where: { id },
      data: dto,
    });
  }

  findAll() {
    return this.prisma.root.findMany({ include: { user: true } });
  }

  findOne(id: number) {
    return this.prisma.root.findUnique({ where: { id }, include: { user: true } });
  }
}
