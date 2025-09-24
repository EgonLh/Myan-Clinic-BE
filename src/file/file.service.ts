/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFileDto } from './dtos/create.file.dto';
import { UpdateFileDto } from './dtos/update.file.dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFileDto) {
    return this.prisma.file.create({ data: dto });
  }

  update(id: number, dto: UpdateFileDto) {
    return this.prisma.file.update({
      where: { id },
      data: dto,
    });
  }
  findAll() {
    return this.prisma.file.findMany({ include: { storage: true } });
  }
}
