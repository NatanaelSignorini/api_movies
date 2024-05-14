import { BaseEntity } from '@apiBase/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Movies extends BaseEntity {
  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;
}
