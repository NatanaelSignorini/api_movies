import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMovieInput } from './create-movie.input.dto';

export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  @ApiProperty({
    description: 'uuid',
    example: 'c1b899e1-769c-4394-b79a-aeb674ba18f8',
  })
  @IsString({ message: 'The id field cannot be null' })
  @IsNotEmpty({ message: 'The id field cannot be null' })
  id: string;
}
