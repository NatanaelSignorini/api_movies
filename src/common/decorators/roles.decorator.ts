import type { RolesEnum } from '@apiBase/modules/users/enum/role.enum';
import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export type RoleType = keyof typeof RolesEnum | 'ANY';

export const Roles = (...roles: RoleType[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
