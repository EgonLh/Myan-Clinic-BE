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

  // Auto-assign least-busy generalist
  private async assignGeneralist(date: string) {
    const generalists = await this.prisma.doctor.findMany({
      where: { type: 'Generalist', isActive: true },
      include: { schedule: true },
    });

    if (!generalists.length) throw new Error('No generalist doctor available');

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const generalistsWithLoad = await Promise.all(
      generalists.map(async (doc) => {
        const count = await this.prisma.appointment.count({
          where: {
            doctorId: doc.id,
            date: { gte: startOfDay, lt: endOfDay },
            status: 'pending',
          },
        });
        return { ...doc, currentLoad: count };
      }),
    );

    generalistsWithLoad.sort((a, b) => a.currentLoad - b.currentLoad);
    return generalistsWithLoad[0];
  }

  async create(dto: CreateAppointmentDto) {
    let doctorId = dto.doctorId;

    if (!doctorId) {
      const assignedDoctor = await this.assignGeneralist(dto.date);
      doctorId = assignedDoctor.id;
    }

    const dataWithLink = {
      ...dto,
      doctorId,
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

  findByPatient(patientId: number) {
    return this.prisma.appointment.findMany({
      where: { patientId },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }

  findByDoctor(doctorId: number) {
    return this.prisma.appointment.findMany({
      where: { doctorId },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });
  }
}
