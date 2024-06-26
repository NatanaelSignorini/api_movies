import { Users } from 'src/modules/users/entities/users.entity';
import { RolesEnum } from 'src/modules/users/enum/role.enum';
import type { MigrationInterface, QueryRunner } from 'typeorm';

const users = [{ email: 'admin@admin.com.br', password: 'adm@adm' }];
export class SeedAdmin1713228409326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      users.map(async (user) => {
        const UserRepo = queryRunner.connection.getRepository(Users);

        const userRepo = UserRepo.create({
          email: user.email,
          password: user.password,
          roles: RolesEnum.ADMIN,
        });
        await UserRepo.save(userRepo);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const UserRepo = queryRunner.connection.getRepository(Users);
    await UserRepo.delete({ email: 'admin@admin.com.br' });
  }
}
