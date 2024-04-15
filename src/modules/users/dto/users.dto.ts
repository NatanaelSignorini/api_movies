import { BaseDTO } from '@apiBase/modules/bases/dto/base.dto';
import { IsDate, IsEmail, IsOptional } from 'class-validator';

export class UserDTO extends BaseDTO {
  @IsOptional()
  @IsEmail()
  email?: string;

  private password?: string;

  @IsOptional()
  @IsDate()
  lastLogin?: Date;
}
