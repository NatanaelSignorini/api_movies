import { Roles } from '@apiBase/modules/roles/entities/role.entity';
import { RolesEnum } from '@apiBase/modules/roles/enum/role.enum';
import { Users } from '@apiBase/modules/users/entities/user.entity';
import type { MigrationInterface, QueryRunner } from 'typeorm';

const users = [{ email: 'admin@admin.com.br', password: 'adm@adm' }];
export class SeedAdmin1713228409326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      users.map(async (user) => {
        const UserRepo = queryRunner.connection.getRepository(Users);

        const admin = UserRepo.create({
          email: user.email,
          password: user.password,
        });
        const RoleRepo = queryRunner.connection.getRepository(Roles);
        admin.roles = await RoleRepo.find({
          where: { name: RolesEnum.SUPER_ADMIN },
        });
        await UserRepo.save(admin);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const UserRepo = queryRunner.connection.getRepository(Users);
    await UserRepo.delete({ email: 'admin@admin.com.br' });
  }
}
