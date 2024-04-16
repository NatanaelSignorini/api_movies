import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthInput {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
