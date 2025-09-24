import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [UserModule, PrismaModule, PatientModule, DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
