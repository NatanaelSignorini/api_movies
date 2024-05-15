import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Users } from '../users/entities/users.entity';

import { CreateMovieInput } from './dto/create-movie.input.dto';
import { UpdateMovieInput } from './dto/update-movie.input.dto';
import { Movies } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Get Movies All' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Users,
  })
  async getMoviesAll(): Promise<any> {
    return this.moviesService.findAllMovies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Movie for id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Movies,
  })
  async getMovieById(@Param('id') id: string): Promise<any> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createMovie(@Body() data: CreateMovieInput): Promise<Users> {
    return this.moviesService.createMovie(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateMovie(
    @Param('id') id: string,
    @Body() data: UpdateMovieInput,
  ): Promise<any> {
    return this.moviesService.updateMovie(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteMovie(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.moviesService.deleteMovie(id);
    return deleted;
  }
}
