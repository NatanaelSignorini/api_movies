import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOneOptions } from 'typeorm';
import { Repository } from 'typeorm';

import type { BaseInputWhere } from '../bases/dto/base.input';
import * as consts from './../../common/constants/error.constants';
import type { CreateUserInput } from './dto/create-user.input.dto';
import type { UpdateUserInput } from './dto/update-user.input.dto';
import type { UserDTO } from './dto/user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    public userRepository: Repository<Users>,
  ) {}

  async findOne(input: BaseInputWhere & FindOneOptions<Users>): Promise<Users> {
    const data = await this.userRepository.findOne({ ...input });
    if (!data) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    return data;
  }

  async findAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    return user;
  }

  async createUser(data: CreateUserInput): Promise<UserDTO> {
    const foundUser = await this.userRepository.findOne({
      where: [{ email: data.email }],
    });
    if (foundUser) {
      throw new UnauthorizedException(consts.USER_EXIST);
    }
    const user: Users = this.userRepository.create({ ...data });
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new InternalServerErrorException(
        'Problem to create a user. Try again',
      );
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<UserDTO> {
    const foundUser: Users = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }

    const buildUser: Users = this.userRepository.create(data);

    const userSaved = await this.userRepository.save({
      ...foundUser,
      ...buildUser,
    });

    return userSaved;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    const deleted = await this.userRepository.softDelete(user.id);
    if (deleted) {
      return true;
    }
    return false;
  }

  async updateLastLogin(id: string): Promise<Users> {
    const foundUser: Users = await this.userRepository.findOne({
      where: { id },
    });

    if (!foundUser) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    delete foundUser.password;
    foundUser.lastLogin = new Date();

    const userSaved = await this.userRepository.save(foundUser);

    return userSaved;
  }
}
