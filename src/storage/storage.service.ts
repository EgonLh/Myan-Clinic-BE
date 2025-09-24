/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dtos/create.storage.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateStorageDto } from './dtos/update.storage.dto';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStorageDto) {
    return this.prisma.storage.create({ data: dto });
  }

  update(id: number, dto: UpdateStorageDto) {
    return this.prisma.storage.update({
      where: { id },
      data: dto,
    });
  }

  findAll() {
    return this.prisma.storage.findMany({
      include: { files: true, patient: true },
    });
  }
}
