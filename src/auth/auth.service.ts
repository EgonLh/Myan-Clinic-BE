/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // register -> set role -> finished
  async register(dto: RegisterDto) {
    // Hash password
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });

    const accessToken = this.signToken(user.id, user.role);
    return {
      accessToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async login(dto: LoginDto) {
    if (!dto.email) {
      throw new BadRequestException('Email is required');
    }

    // Find the user by email (no need to include patient yet)
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    // Sign JWT
    const accessToken = this.signToken(user.id, user.role);

    // Determine relatedId by mapping User.id to the appropriate table
    let relatedId: number | null = 0;
    console.log('the user with related id', user.role);
    if (user.role === 'Patient') {
      // Find the patient row by uid
      console.log("The id",user.id);

      const patient = await this.prisma.patient.findUnique({
        where: { uid: user.id },
      }); 
      relatedId = patient?.id ?? null; // will be null if patient row doesn't exist yet
      console.log('patient', relatedId);
    } else if (user.role === 'Doctor') {
      const doctor = await this.prisma.doctor.findUnique({
        where: { uid: user.id },
      });
      relatedId = doctor?.id ?? null;
      console.log('doc', relatedId);
    } else if (user.role === 'Root') {
      const root = await this.prisma.root.findUnique({
        where: { uid: user.id },
      });
      relatedId = root?.id ?? null;
      console.log('root', relatedId);
    }

    console.log("Related  one:",relatedId)
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        user_id: relatedId, // patientId, doctorId, or rootId
      },
    };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isValid) throw new UnauthorizedException('Old password is incorrect');

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: 'Password updated successfully' };
  }
  signToken(userId: number, role: string): string {
    const payload = { sub: userId, role };
    return this.jwtService.sign(payload);
  }
}
