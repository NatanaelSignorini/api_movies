import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import type { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsersAll(): Promise<UserDTO[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDTO> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() data: CreateUserInput): Promise<UserDTO> {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserInput,
  ): Promise<UserDTO> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.usersService.deleteUser(id);
    return deleted;
  }
}
