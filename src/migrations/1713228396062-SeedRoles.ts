import { Roles } from '@apiBase/modules/roles/entities/role.entity';
import { RolesEnum } from '@apiBase/modules/roles/enum/role.enum';
import type { MigrationInterface, QueryRunner } from 'typeorm';

const ROLES = Object.values(RolesEnum);

export class SeedRoles1713228396062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const RoleRepo = queryRunner.connection.getRepository(Roles);
    await RoleRepo.save(ROLES.map((role) => ({ name: role })));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const RoleRepo = queryRunner.connection.getRepository(Roles);
    const roles = await RoleRepo.find({
      where: ROLES.map((role) => ({ name: role })),
    });
    RoleRepo.remove(roles);
  }
}
