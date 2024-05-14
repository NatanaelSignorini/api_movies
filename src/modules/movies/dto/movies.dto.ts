import { BaseDTO } from '@apiBase/modules/bases/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MoviesDTO extends BaseDTO {
  @ApiProperty({ description: 'Movie Name', example: 'movie 123' })
  name?: string;
}
