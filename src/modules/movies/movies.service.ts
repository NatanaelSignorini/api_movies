import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as consts from './../../common/constants/error.constants';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import type { CreateMovieInput } from './dto/create-movie.input.dto';
import type { MoviesDTO } from './dto/movies.dto';
import type { UpdateMovieInput } from './dto/update-movie.input.dto';
import { Movies } from './entities/movies.entity';
import { GenreEnum } from './enum/genre.enum';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Movies)
    public moviesRepository: Repository<Movies>,
  ) {}

  async findAllMovies(): Promise<MoviesDTO[]> {
    const cacheDataMovies = await this.cacheManager.get<MoviesDTO[]>('movies');
    if (cacheDataMovies) {
      return cacheDataMovies;
    }
    const moviesData = await this.moviesRepository.find();
    const moviesDTOData: MoviesDTO[] = moviesData.map((movie) => ({
      id: movie.id,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      deletedAt: movie.deletedAt,
      title: movie.title,
      year: movie.year,
      released: movie.released,
      runtime: movie.runtime,
      genre: movie.genre,
    }));
    await this.cacheManager.set('movies', moviesDTOData, 10 * 1000);
    return moviesDTOData;
  }

  async getMovieById(id: string): Promise<MoviesDTO> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(consts.MOVIES_NOT_FOUND);
    }
    return {
      id: movie.id,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      deletedAt: movie.deletedAt,
      title: movie.title,
      year: movie.year,
      released: movie.released,
      runtime: movie.runtime,
      genre: movie.genre,
    };
  }

  async createMovie(data: CreateMovieInput): Promise<MoviesDTO> {
    const foundMovie = await this.moviesRepository.findOne({
      where: [{ title: data.title }],
    });
    if (foundMovie) {
      throw new UnauthorizedException(consts.MOVIES_EXIST);
    }

    const genreArray: GenreEnum[] = data.genre.map(
      (genre: string) => GenreEnum[genre],
    );

    const movies: MoviesDTO = new Movies();
    movies.title = data.title;
    movies.year = data.year;
    movies.released = data.released;
    movies.runtime = data.runtime;
    movies.genre = genreArray;
    const userSaved = await this.moviesRepository.save(movies);
    if (!userSaved) {
      throw new InternalServerErrorException(
        'Problem to create a Movies. Try again',
      );
    }

    return {
      id: userSaved.id,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      deletedAt: userSaved.deletedAt,
      title: userSaved.title,
      year: userSaved.year,
      released: userSaved.released,
      runtime: userSaved.runtime,
      genre: userSaved.genre,
    };
  }

  async updateMovie(id: string, data: UpdateMovieInput): Promise<MoviesDTO> {
    const foundMovie: Movies = await this.moviesRepository.findOne({
      where: { id },
    });
    if (!foundMovie) {
      throw new NotFoundException(consts.MOVIES_NOT_FOUND);
    }

    const buildMovie: Movies = this.moviesRepository.create(data);

    const userSaved = await this.moviesRepository.save({
      ...foundMovie,
      ...buildMovie,
    });

    return {
      id: userSaved.id,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      deletedAt: userSaved.deletedAt,
      title: userSaved.title,
      year: userSaved.year,
      released: userSaved.released,
      runtime: userSaved.runtime,
      genre: userSaved.genre,
    };
  }

  async deleteMovie(id: string): Promise<boolean> {
    const movie = await this.getMovieById(id);
    const deleted = await this.moviesRepository.softDelete(movie.id);
    if (deleted) {
      return true;
    }
    return false;
  }
}
