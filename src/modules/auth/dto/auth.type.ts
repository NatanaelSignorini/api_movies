import { IsBoolean, IsString } from 'class-validator';
import type { UserDTO } from 'src/modules/users/dto/user.dto';

export class AuthType {
  user: UserDTO;

  @IsString()
  token: string;
}

export class TokenValidType {
  @IsBoolean()
  valid: boolean;
}
