import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GenreEnum } from '../enum/genre.enum';

export class CreateMovieInput {
  @ApiProperty({ description: 'movie name', example: 'Batman' })
  @IsNotEmpty({ message: 'The name field cannot be null' })
  title: string;

  @ApiPropertyOptional({ description: 'movie year', example: '1989' })
  year?: string;

  @ApiPropertyOptional({ description: 'movie rated', example: 'PG-13' })
  rated?: string;

  @ApiPropertyOptional({
    description: 'movie released',
    example: '23 Jun 1989',
  })
  released?: string;

  @ApiPropertyOptional({ description: 'movie runtime', example: '100 min' })
  runtime?: string;

  @ApiProperty({
    description: 'movie genre',
    example: 'Action, Adventure',
    enumName: 'GenreEnum',
    enum: GenreEnum,
  })
  @IsNotEmpty({ message: 'The genre field cannot be null' })
  genre: GenreEnum[];

  @ApiPropertyOptional({ description: 'movie director', example: 'Tim Burton' })
  director?: string;

  @ApiPropertyOptional({
    description: 'movie writer',
    example: 'Bob Kane, Sam Hamm, Warren Skaaren',
  })
  writer?: string;

  @ApiPropertyOptional({
    description: 'movie actors',
    example: 'Michael Keaton, Jack Nicholson, Kim Basinger',
  })
  actors?: string;

  @ApiPropertyOptional({
    description: 'movie plot',
    example:
      'The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.',
  })
  plot?: string;

  @ApiPropertyOptional({
    description: 'movie language',
    example: 'English, French, Spanish',
  })
  language?: string;

  @ApiPropertyOptional({
    description: 'movie country',
    example: 'United States, United Kingdom',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'movie awards',
    example: 'Won 1 Oscar. 11 wins & 28 nominations total',
  })
  awards?: string;

  @ApiPropertyOptional({
    description: 'movie poster',
    example: 'image.jpg, image.png',
  })
  poster?: string;
}
