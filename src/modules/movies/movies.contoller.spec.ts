import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import type { CreateMovieInput } from './dto/create-movie.input.dto';
import type { MoviesDTO } from './dto/movies.dto';
import type { UpdateMovieInput } from './dto/update-movie.input.dto';
import { GenreEnum } from './enum/genre.enum';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMoviesAll', () => {
    it('should return an array of movies', async () => {
      const result: MoviesDTO[] = [
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
          title: 'Test',
          year: '1900',
          runtime: '100 min',
          released: new Date(),
          genre: [GenreEnum.Action],
        },
      ];
      jest.spyOn(service, 'findAllMovies').mockResolvedValue(result);

      expect(await controller.getMoviesAll()).toEqual(result);
    });
  });

  describe('getMovieById', () => {
    it('should return a movie by id', async () => {
      const movieId = uuidv4();
      const result: MoviesDTO = {
        id: movieId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        title: 'Test',
        year: '1900',
        runtime: '100 min',
        released: new Date(),
        genre: [GenreEnum.Action],
      };
      jest.spyOn(service, 'getMovieById').mockResolvedValue(result);

      expect(await controller.getMovieById(movieId)).toEqual(result);
    });
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      const movieData: CreateMovieInput = {
        title: 'New Movie',
        year: '1900',
        released: new Date(),
        runtime: '100 min',
        genre: [GenreEnum.Action],
      };
      const createdMovie: MoviesDTO = {
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        title: 'Test',
        year: '1900',
        runtime: '100 min',
        released: new Date(),
        genre: [GenreEnum.Action],
      };
      jest.spyOn(service, 'createMovie').mockResolvedValue(createdMovie);

      expect(await controller.createMovie(movieData)).toEqual(createdMovie);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      const movieId = uuidv4();
      const movieData: UpdateMovieInput = {
        id: movieId,
        title: 'New Movie',
        year: '1900',
        released: new Date(),
        runtime: '100 min',
        genre: [GenreEnum.Action],
      };
      const updatedMovie: MoviesDTO = { id: movieId, ...movieData };
      jest.spyOn(service, 'updateMovie').mockResolvedValue(updatedMovie);

      expect(await controller.updateMovie(movieId, movieData)).toEqual(
        updatedMovie,
      );
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', async () => {
      const movieId = uuidv4();
      jest.spyOn(service, 'deleteMovie').mockResolvedValue(true);

      expect(await controller.deleteMovie(movieId)).toEqual(true);
    });
  });
});
