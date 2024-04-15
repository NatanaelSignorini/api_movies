import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RolesEnum } from '../enum/role.enum';

export class RoleInputDTO {
  @IsString()
  id: string;

  @IsNotEmpty({ message: 'The Name field cannot be null' })
  @IsOptional()
  @IsEnum(RolesEnum, { message: 'Invalid role name' })
  name?: RolesEnum;
}
