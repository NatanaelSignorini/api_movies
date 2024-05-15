import { BaseEntity } from '@apiBase/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { GenreEnum } from '../enum/genre.enum';

@Entity()
export class Movies extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'date', nullable: true })
  year?: Date;

  @Column({ type: 'varchar', nullable: true })
  rated?: string;

  @Column({ type: 'date', nullable: true })
  released?: Date;

  @Column({ type: 'varchar', nullable: true })
  runtime?: string;

  @Column({
    name: 'genre',
    type: 'enum',
    enum: GenreEnum,
    nullable: true,
  })
  genre?: GenreEnum[];

  @Column({ type: 'varchar', nullable: true })
  director?: string;

  @Column({ type: 'varchar', nullable: true })
  writer?: string;

  @Column({ type: 'varchar', nullable: true })
  actors?: string;

  @Column({ type: 'varchar', nullable: true })
  plot?: string;

  @Column({ type: 'varchar', nullable: true })
  poster?: string;
}
