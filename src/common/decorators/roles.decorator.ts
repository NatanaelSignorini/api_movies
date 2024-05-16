import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import type { RolesEnum } from 'src/modules/users/enum/role.enum';

export type RoleType = keyof typeof RolesEnum | 'ANY';

export const Roles = (...roles: RoleType[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
