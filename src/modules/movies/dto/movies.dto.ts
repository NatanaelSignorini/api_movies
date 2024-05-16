import { BaseDTO } from 'src/modules/bases/dto/base.dto';
import type { GenreEnum } from '../enum/genre.enum';

export class MoviesDTO extends BaseDTO {
  title?: string;

  year?: string;

  released?: Date;

  runtime?: string;

  genre?: GenreEnum[];
}
