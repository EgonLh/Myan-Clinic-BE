import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAppointmentDto } from './dtos/create.appointment.dto';
import { UpdateAppointmentDto } from './dtos/update.appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  private generateJitsiLink(): string {
    const roomName = `meeting-${Math.random().toString(36).substring(2, 10)}`;
    return `https://meet.jit.si/${roomName}`;
  }

  create(dto: CreateAppointmentDto) {
    const dataWithLink = {
      ...dto,
      meetingLink: dto.meetingLink || this.generateJitsiLink(),
    };

    return this.prisma.appointment.create({
      data: dataWithLink,
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }

  update(id: number, dto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: dto,
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }

  // NEW: Find appointments by patientId
  findByPatient(patientId: number) {
    return this.prisma.appointment.findMany({
      where: { patientId },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }
}
