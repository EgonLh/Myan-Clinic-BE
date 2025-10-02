import { Controller, Get } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  // Dashboard summary counts
  @Get('summary')
  getSummary() {
    return this.analysisService.getSummary();
  }

  // Appointments count grouped by status
  @Get('appointments-status')
  getAppointmentsByStatus() {
    return this.analysisService.getAppointmentsByStatus();
  }

  // Patients growth over time (monthly)
  @Get('patients-growth')
  getPatientsGrowth() {
    return this.analysisService.getPatientsGrowth();
  }

  // Optional: Doctors grouped by department
  @Get('doctors-department')
  getDoctorsByDepartment() {
    return this.analysisService.getDoctorsByDepartment();
  }

  // Optional: Appointments count per doctor
  @Get('appointments-per-doctor')
  getAppointmentsPerDoctor() {
    return this.analysisService.getAppointmentsPerDoctor();
  }
}
