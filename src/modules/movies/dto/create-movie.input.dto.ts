import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieInput {
  @ApiProperty({ description: 'movie name', example: 'movie 123' })
  @IsNotEmpty({ message: 'The name field cannot be null' })
  name: string;
}
