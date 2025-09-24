/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create(dto: CreateUserDto) {
    return this.userRepo.create(dto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  remove(id: number) {
    return this.userRepo.remove(id);
  }
}
