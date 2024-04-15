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
import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import { Users } from './entities/user.entity';

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

  async findAllUsers(): Promise<Users[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }
    return user;
  }

  async createUser(data: CreateUserInput): Promise<Users> {
    const foundUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (foundUser) {
      throw new UnauthorizedException(consts.USER_EXIST);
    }

    const roles = { name: data.roles.name };
    const user: Users = this.userRepository.create({
      email: data.email,
      password: data.password,
      roles: [roles],
    });

    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new InternalServerErrorException(
        'Problem creating user. Please try again',
      );
    }
    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<Users> {
    // Encontre o usuário pelo ID
    const foundUser: Users = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException(consts.USER_NOT_FOUND);
    }

    // Converta roles para o tipo esperado
    const roles = Array.isArray(data.roles)
      ? data.roles.map((role) => ({ name: role.name }))
      : [{ name: data.roles.name }];

    // Crie um novo objeto Users com os dados atualizados
    const updatedUser: Partial<Users> = {
      ...foundUser,
      ...data,
      roles: roles,
    };

    // Salve o usuário atualizado no banco de dados
    const userSaved = await this.userRepository.save(updatedUser);
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
