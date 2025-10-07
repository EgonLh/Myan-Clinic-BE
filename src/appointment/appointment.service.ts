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

  // ✅ Assign the least-busy generalist automatically
  private async assignGeneralist(date: string) {
    // 1. Get all active generalists
    const generalists = await this.prisma.doctor.findMany({
      where: { type: 'Generalist', isActive: true },
      include: { schedule: true },
    });

    if (!generalists.length) throw new Error('No generalist doctor available');

    // 2. Compute current load for the selected day
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

    // 3. Pick the least-busy doctor (round-robin if tie)
    generalistsWithLoad.sort((a, b) => a.currentLoad - b.currentLoad);
    return generalistsWithLoad[0];
  }

  // ✅ Create appointment with automatic generalist assignment
  async create(dto: CreateAppointmentDto) {
    let doctorId = dto.doctorId;

    // Auto-assign generalist if no doctor specified
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
