import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Roles } from '@apiBase/common/decorators/auth.roles.decoretor';
import { ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '../roles/enum/role.enum';
import { CreateUserInput } from './dto/create-user.input.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import type { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  async getUsersAll(): Promise<Users[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  async getUserById(@Param('id') id: string): Promise<Users> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  async createUser(@Body() data: CreateUserInput): Promise<Users> {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserInput,
  ): Promise<Users> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.usersService.deleteUser(id);
    return deleted;
  }
}
