import { BaseDTO } from '@apiBase/modules/bases/dto/base.dto';

export class UserDTO extends BaseDTO {
  email?: string;

  lastLogin?: Date;
}
