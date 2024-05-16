import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { GenreEnum } from '../enum/genre.enum';

@Entity()
export class Movies extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  year?: string;

  @Column({ type: 'date', nullable: true })
  released?: Date;

  @Column({ type: 'varchar', nullable: true })
  runtime?: string;

  @Column({
    name: 'genre',
    type: 'enum',
    enum: GenreEnum,
    array: true,
    nullable: true,
  })
  genre?: GenreEnum[];
}
