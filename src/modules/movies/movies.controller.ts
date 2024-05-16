import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from '../users/entities/users.entity';

import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreateMovieInput } from './dto/create-movie.input.dto';
import type { MoviesDTO } from './dto/movies.dto';
import { UpdateMovieInput } from './dto/update-movie.input.dto';
import { Movies } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
// @UseInterceptors(CacheInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get Movies All' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Users,
  })
  async getMoviesAll(): Promise<MoviesDTO[]> {
    return this.moviesService.findAllMovies();
  }

  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get Movie for id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Movies,
  })
  async getMovieById(@Param('id') id: string): Promise<MoviesDTO> {
    return this.moviesService.getMovieById(id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create Movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createMovie(@Body() data: CreateMovieInput): Promise<MoviesDTO> {
    return this.moviesService.createMovie(data);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update Movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateMovie(
    @Param('id') id: string,
    @Body() data: UpdateMovieInput,
  ): Promise<MoviesDTO> {
    return this.moviesService.updateMovie(id, data);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Movie' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteMovie(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.moviesService.deleteMovie(id);
    return deleted;
  }
}
