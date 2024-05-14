import type { RoleInputDTO } from '@apiBase/modules/roles/dto/role.input';
import { RolesEnum } from '@apiBase/modules/roles/enum/role.enum';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({ description: 'email', example: 'user@user.com' })
  @IsEmail({}, { message: 'Non-standard email' })
  @IsNotEmpty({ message: 'The Email field cannot be null' })
  email: string;

  @ApiProperty({ description: 'password', example: '123@abc' })
  @IsNotEmpty({ message: 'The Password field cannot be null' })
  password: string;

  @ApiProperty({ description: 'Enum for Roles', enum: RolesEnum })
  @IsEnum({ message: 'The roles field cannot be null' })
  roles: RoleInputDTO[];
}

export class CreateUserInputWithoutRole extends OmitType(CreateUserInput, [
  'roles',
] as const) {}
