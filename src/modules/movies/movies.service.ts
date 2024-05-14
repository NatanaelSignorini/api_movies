import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as consts from './../../common/constants/error.constants';

import type { UpdateMovieInput } from './dto/update-movie.input.dto';

import type { CreateMovieInput } from './dto/create-movie.input.dto';
import { Movies } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    public moviesRepository: Repository<Movies>,
  ) {}

  async findAllMovies(): Promise<any[]> {
    const users = await this.moviesRepository.find();
    return users;
  }

  async getMovieById(id: string): Promise<any> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    return movie;
  }

  async createMovie(data: CreateMovieInput): Promise<any> {
    return;
  }

  async updateMovie(id: string, data: UpdateMovieInput): Promise<any> {
    const foundMovie: Movies = await this.moviesRepository.findOne({
      where: { id },
    });
    if (!foundMovie) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }

    const buildMovie: Movies = this.moviesRepository.create(data);

    const userSaved = await this.moviesRepository.save({
      ...foundMovie,
      ...buildMovie,
    });

    return userSaved;
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
