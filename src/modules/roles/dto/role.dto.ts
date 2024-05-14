import { BaseDTO } from '@apiBase/modules/bases/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../enum/role.enum';

export class RoleDTO extends BaseDTO {
  @ApiProperty({ description: '', enum: RolesEnum, example: '' })
  @IsString()
  @IsNotEmpty({ message: 'The Name field cannot be null' })
  @IsEnum(RolesEnum, { message: 'Invalid role name' })
  name?: RolesEnum;
}
