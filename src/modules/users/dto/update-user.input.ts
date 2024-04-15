import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString({ message: 'The Email field cannot be null' })
  @IsNotEmpty({ message: 'The Email field cannot be null' })
  id?: string;
}
