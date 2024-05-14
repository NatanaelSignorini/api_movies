import { BaseDTO } from '@apiBase/modules/bases/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO extends BaseDTO {
  @ApiProperty({ description: '', example: 'user@user.com' })
  email?: string;
  @ApiProperty({ description: '', example: 'user@user.com' })
  password?: string;
  @ApiProperty({ description: '', example: 'user@user.com' })
  lastLogin?: Date;
}
