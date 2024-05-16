import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GenreEnum } from '../enum/genre.enum';

export class CreateMovieInput {
  @ApiProperty({ description: 'movie name', example: 'Batman' })
  @IsNotEmpty({ message: 'The name field cannot be null' })
  title: string;

  @ApiPropertyOptional({ description: 'movie year', example: '1989' })
  year?: string;

  @ApiPropertyOptional({
    description: 'movie released',
    example: '23 Jun 1989',
  })
  released?: Date;

  @ApiPropertyOptional({ description: 'movie runtime', example: '100 min' })
  runtime?: string;

  @ApiPropertyOptional({
    description: 'movie genre',
    example: 'Action, Adventure',
    enum: GenreEnum,
  })
  genre?: GenreEnum[];
}
