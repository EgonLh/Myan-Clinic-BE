/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
      },
    });
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
