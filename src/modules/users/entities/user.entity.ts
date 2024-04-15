import { encodePassword } from '@apiBase/common/decorators/encode-password';
import { BaseEntity } from '@apiBase/modules/bases/entities/base.entity';
import { Roles } from '@apiBase/modules/roles/entities/role.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Roles, (roles) => roles.users, {
    nullable: false,
    eager: true,
  })
  @JoinTable()
  roles: Roles[];

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }
}
