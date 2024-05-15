import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @IsEmail({}, { message: 'Non-standard email' })
  @IsNotEmpty({ message: 'The Email field cannot be null' })
  email: string;

  @IsNotEmpty({ message: 'The Password field cannot be null' })
  password: string;

  // @IsEnum({ message: 'The roles field cannot be null' })
  // roles: RolesEnum;
}

// export class CreateUserInputWithoutRole extends OmitType(CreateUserInput, [
//   'roles',
// ] as const) {}
