import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import type { CreateMovieInput } from './dto/create-movie.input.dto';
import type { UpdateMovieInput } from './dto/update-movie.input.dto';
import { Movies } from './entities/movies.entity';
import { GenreEnum } from './enum/genre.enum';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: Repository<Movies>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movies),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<Repository<Movies>>(
      getRepositoryToken(Movies),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllMovies', () => {
    it('should return an array of movies', async () => {
      const userData = [new Movies(), new Movies()];
      movieRepository.find = jest.fn().mockResolvedValue(userData);
      const result = await service.findAllMovies();
      expect(result).toHaveLength(2);
    });
  });

  describe('getMovieById', () => {
    it('should return a movie by id', async () => {
      const movieId = uuidv4();
      const movie = new Movies();
      movie.id = movieId;
      movie.title = 'New Movie';
      movie.year = '1900';
      movie.released = new Date();
      movie.runtime = '100 min';
      movie.genre = [GenreEnum.Action];

      movieRepository.findOne = jest.fn().mockResolvedValue(movie);

      const result = await service.getMovieById(movieId);

      expect(result).toEqual(movie);
    });

    it('should throw NotFoundException if movie is not found', async () => {
      movieRepository.findOne = jest.fn().mockResolvedValue(undefined);
      const movieId = uuidv4();

      await expect(service.getMovieById(movieId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      const createMovieInput: CreateMovieInput = {
        title: 'New Movie',
        year: '2022',
        released: new Date(),
        runtime: '120',
        genre: [GenreEnum.Action, GenreEnum.Adventure],
      };
      movieRepository.findOne = jest.fn().mockResolvedValue(undefined);
      movieRepository.create = jest.fn().mockReturnValue(createMovieInput);
      movieRepository.save = jest.fn().mockResolvedValue(createMovieInput);

      const result = await service.createMovie(createMovieInput);

      expect(result).toEqual(expect.objectContaining(createMovieInput));
    });

    it('should throw UnauthorizedException if movie already exists', async () => {
      const existingUser = new Movies();
      movieRepository.findOne = jest.fn().mockResolvedValue(existingUser);

      await expect(
        service.createMovie({
          title: 'New Movie',
          year: '2022',
          released: new Date(),
          runtime: '120',
          genre: [GenreEnum.Action, GenreEnum.Adventure],
        }),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw InternalServerErrorException if failed to save movie', async () => {
      movieRepository.findOne = jest.fn().mockResolvedValue(undefined);
      movieRepository.create = jest.fn().mockReturnValue({});
      movieRepository.save = jest.fn().mockResolvedValue(undefined);

      await expect(
        service.createMovie({
          title: 'New Movie',
          year: '2022',
          released: new Date(),
          runtime: '120',
          genre: [GenreEnum.Action, GenreEnum.Adventure],
        }),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie and return MovieDTO', async () => {
      const movieId = uuidv4();
      const updateMovieInput: UpdateMovieInput = {
        id: movieId,
        title: 'New Movie',
        year: '2022',
        released: new Date(),
        runtime: '120',
        genre: [GenreEnum.Action, GenreEnum.Adventure],
      };
      const existingMovies = new Movies();
      existingMovies.id = movieId;
      movieRepository.findOne = jest.fn().mockResolvedValue(existingMovies);
      movieRepository.create = jest.fn().mockReturnValue(updateMovieInput);
      movieRepository.save = jest.fn().mockResolvedValue(updateMovieInput);

      const result = await service.updateMovie(movieId, updateMovieInput);

      expect(result).toEqual(expect.objectContaining(updateMovieInput));
    });

    it('should throw NotFoundException if movie is not found', async () => {
      const movieId = uuidv4();
      movieRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(
        service.updateMovie(movieId, {
          id: movieId,
          title: 'New Movie',
          year: '2022',
          released: new Date(),
          runtime: '120',
          genre: [GenreEnum.Action, GenreEnum.Adventure],
        }),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', async () => {
      const movieId = uuidv4();
      const movie = new Movies();
      movie.id = movieId;
      movieRepository.findOne = jest.fn().mockResolvedValue(movie);
      movieRepository.softDelete = jest.fn().mockResolvedValue(true);

      const result = await service.deleteMovie(movieId);

      expect(result).toEqual(true);
    });

    it('should return false if failed to delete movie', async () => {
      const movieId = uuidv4();
      const movie = new Movies();
      movie.id = movieId;
      movieRepository.findOne = jest.fn().mockResolvedValue(movie);
      movieRepository.softDelete = jest.fn().mockResolvedValue(false);

      const result = await service.deleteMovie(movieId);

      expect(result).toEqual(false);
    });
  });
});
