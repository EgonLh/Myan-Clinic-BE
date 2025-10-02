import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStorageDto } from './dtos/create.storage.dto';
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

  // NEW: find storage by patientId
  findByPatient(patientId: number) {
    return this.prisma.storage.findMany({
      where: { patientId },
      include: { files: true, patient: true },
    });
  }
}
