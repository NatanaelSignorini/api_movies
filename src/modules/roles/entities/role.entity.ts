import { BaseEntity } from '@apiBase/modules/bases/entities/base.entity';
import { Users } from '@apiBase/modules/users/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { RolesEnum } from '../enum/role.enum';

@Entity()
export class Roles extends BaseEntity {
  @Column({
    name: 'name',
    type: 'enum',
    enum: RolesEnum,
    nullable: false,
  })
  name: RolesEnum;

  @ManyToMany(() => Users, (users) => users.roles, { nullable: true })
  users?: Users[];
}
