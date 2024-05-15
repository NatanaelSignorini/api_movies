import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { Users } from '../users/entities/users.entity';

import { CreateMovieInput } from './dto/create-movie.input.dto';
import { UpdateMovieInput } from './dto/update-movie.input.dto';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMoviesAll(): Promise<any> {
    return this.moviesService.findAllMovies();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string): Promise<any> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  async createMovie(@Body() data: CreateMovieInput): Promise<Users> {
    return this.moviesService.createMovie(data);
  }

  @Patch(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() data: UpdateMovieInput,
  ): Promise<any> {
    return this.moviesService.updateMovie(id, data);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.moviesService.deleteMovie(id);
    return deleted;
  }
}
