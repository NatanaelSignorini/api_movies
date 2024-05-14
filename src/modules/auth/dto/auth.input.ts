import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthInput {
  @ApiProperty({ description: '', example: 'user@user.com' })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: '', example: '123@abc' })
  @IsString()
  password: string;
}
