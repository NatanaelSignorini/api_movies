import { RoleInputDTO } from '@apiBase/modules/roles/dto/role.input';
import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @IsEmail({}, { message: 'Non-standard email' })
  @IsNotEmpty({ message: 'The Email field cannot be null' })
  email: string;

  @IsNotEmpty({ message: 'The Password field cannot be null' })
  password: string;

  @IsNotEmpty({ message: 'The Roles field cannot be null' })
  roles: RoleInputDTO;
}

export class CreateUserInputWithoutRole extends OmitType(CreateUserInput, [
  'roles',
] as const) {}
