import { BaseDTO } from '@apiBase/modules/bases/dto/base.dto';
import type { GenreEnum } from '../enum/genre.enum';

export class MoviesDTO extends BaseDTO {
  title: string;

  year: string;

  rated?: string;

  released?: string;

  runtime?: string;

  genre: GenreEnum;

  director?: string;

  writer?: string;

  actors?: string;

  plot?: string;

  language?: string;

  country?: string;

  awards?: string;

  poster?: string;
}
