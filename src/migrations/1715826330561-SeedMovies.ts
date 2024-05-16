import { faker } from '@faker-js/faker';
import type { CreateMovieInput } from 'src/modules/movies/dto/create-movie.input.dto';
import { Movies } from 'src/modules/movies/entities/movies.entity';
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMovies1715826330561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const moviesCount = 1000;
    const movies: CreateMovieInput[] = [];
    const genres = [
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Horror',
      'Sci-Fi',
    ];

    for (let i = 0; i < moviesCount; i++) {
      const selectedGenres = [];

      const numberOfGenres = faker.number.int({
        min: 1,
        max: 5,
      });

      for (let j = 0; j < numberOfGenres; j++) {
        const randomIndex = faker.number.int({
          min: 0,
          max: genres.length - 1,
        });
        selectedGenres.push(genres[randomIndex]);
      }

      const movie: CreateMovieInput = {
        title: faker.lorem.words(2),
        year: String(faker.number.int({ min: 1900, max: 2022 })),
        released: faker.date.past(),
        runtime: faker.number.int({ min: 60, max: 240 }) + ' min',
        genre: selectedGenres,
      };

      movies.push(movie);
    }
    await queryRunner.manager.getRepository(Movies).save(movies);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM movies`);
  }
}
