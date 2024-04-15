import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import type { Users } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @Roles('SUPER_ADMIN', 'ADMIN')
  async getUsersAll(): Promise<Users[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  // @Roles('SUPER_ADMIN', 'ADMIN')
  async getUserById(@Param('id') id: string): Promise<Users> {
    return this.usersService.getUserById(id);
  }

  @Post()
  // @Roles('SUPER_ADMIN', 'ADMIN')
  async createUser(@Body() data: CreateUserInput): Promise<Users> {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  // @Roles('SUPER_ADMIN', 'ADMIN')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserInput,
  ): Promise<Users> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  // @Roles('SUPER_ADMIN', 'ADMIN')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.usersService.deleteUser(id);
    return deleted;
  }
}
