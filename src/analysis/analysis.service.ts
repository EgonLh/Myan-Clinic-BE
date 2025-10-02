import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  // Summary counts for dashboard
  async getSummary() {
    const patientsCount = await this.prisma.patient.count();
    const doctorsCount = await this.prisma.doctor.count();
    const appointmentsCount = await this.prisma.appointment.count();
    const storagesCount = await this.prisma.storage.count();

    // Total files in storage
    const filesCount = await this.prisma.file.count();

    return {
      patientsCount,
      doctorsCount,
      appointmentsCount,
      storagesCount,
      filesCount,
    };
  }

  // Appointments count by status
  async getAppointmentsByStatus() {
    const data = await this.prisma.appointment.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    return data;
  }

  // Patients growth over time (grouped by month)
  async getPatientsGrowth() {
    const data = await this.prisma.$queryRaw<
      { month: string; count: number }[]
    >`
      SELECT TO_CHAR("createdAt", 'YYYY-MM') AS month,
             COUNT(*) AS count
      FROM "Patient"
      GROUP BY month
      ORDER BY month;
    `;
    return data;
  }

  // Doctors by department
  async getDoctorsByDepartment() {
    const data = await this.prisma.doctor.groupBy({
      by: ['departmentId'],
      _count: { id: true },
    });

    // Map departmentId to department name
    const departments = await this.prisma.department.findMany();
    return data.map((d) => {
      const dept = departments.find((dep) => dep.id === d.departmentId);
      return {
        department: dept?.name || 'Unknown',
        count: d._count.id,
      };
    });
  }

  // Optional: Appointments per doctor
  async getAppointmentsPerDoctor() {
    const data = await this.prisma.appointment.groupBy({
      by: ['doctorId'],
      _count: { id: true },
    });

    const doctors = await this.prisma.doctor.findMany({
      include: { user: true },
    });

    return data.map((d) => {
      const doctor = doctors.find((doc) => doc.id === d.doctorId);
      return {
        doctorName: doctor?.user.name || 'Unknown',
        appointmentsCount: d._count.id,
      };
    });
  }
}
