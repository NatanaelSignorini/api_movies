import type { Users } from '@apiBase/modules/users/entities/users.entity';
import { IsBoolean, IsString } from 'class-validator';

export class AuthType {
  user: Users;

  @IsString()
  token: string;
}

export class TokenValidType {
  @IsBoolean()
  valid: boolean;
}
