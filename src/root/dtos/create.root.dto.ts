/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateRootDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  uid: number; // reference to User.id

  @ApiProperty({ example: 'Root' })
  @IsString()
  role: string;
}
