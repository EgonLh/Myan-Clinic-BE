import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { FileModule } from './file/file.module';
import { StorageModule } from './storage/storage.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DepartmentModule } from './department/department.module';
import { RootModule } from './root/root.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    PatientModule,
    DoctorModule,
    FileModule,
    StorageModule,
    AppointmentModule,
    DepartmentModule,
    RootModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
