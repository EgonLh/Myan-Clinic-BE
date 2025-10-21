/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

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
        patient: {
          include: {
            storage: {
              include: { files: true },
            },
          },
        },
        root: true,
      },
    });
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  /**
   * Cascade remove:
   * Deletes user and all their related records (Patient, Doctor, Root, Storage, Files, Appointments)
   */
  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        patient: { include: { storage: { include: { files: true } } } },
        doctor: true,
        root: true,
      },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return this.prisma.$transaction(async (tx) => {
      // --- PATIENT cascade ---
      if (user.role === 'Patient' && user.patient) {
        const patientId = user.patient.id;

        // Delete files (if any)
        if (user.patient.storage) {
          await tx.file.deleteMany({
            where: { storageId: user.patient.storage.id },
          });

          await tx.storage.delete({
            where: { patientId },
          });
        }

        // Delete appointments for this patient
        await tx.appointment.deleteMany({
          where: { patientId },
        });

        // Delete patient record
        await tx.patient.delete({
          where: { uid: id },
        });
      }

      // --- DOCTOR cascade ---
      if (user.role === 'Doctor' && user.doctor) {
        const doctorId = user.doctor.id;

        // Delete appointments for this doctor
        await tx.appointment.deleteMany({
          where: { doctorId },
        });

        // Delete doctor record
        await tx.doctor.delete({
          where: { uid: id },
        });
      }

      // --- ROOT cascade ---
      if (user.role === 'Root' && user.root) {
        await tx.root.delete({
          where: { uid: id },
        });
      }

      // --- Finally, delete user ---
      await tx.user.delete({
        where: { id },
      });

      return {
        message: `User ${id} and all related records deleted successfully.`,
      };
    });
  }
}
