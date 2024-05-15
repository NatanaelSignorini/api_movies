import { encodePassword } from '@apiBase/common/decorators/encode-password';
import { BaseEntity } from '@apiBase/modules/bases/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { RolesEnum } from '../enum/role.enum';

@Entity()
export class Users extends BaseEntity {
  @Column({ type: 'varchar', length: 45, unique: true, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 72,
    nullable: false,
    transformer: encodePassword,
  })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @Column({
    name: 'role',
    type: 'enum',
    enum: RolesEnum,
    nullable: true,
  })
  role: RolesEnum;

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }
}
