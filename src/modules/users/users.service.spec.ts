import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import type { CreateUserInput } from './dto/create-user.input.dto';
import type { UpdateUserInput } from './dto/update-user.input.dto';
import { Users } from './entities/users.entity';
import { RolesEnum } from './enum/role.enum';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      const userId = uuidv4();
      const user = new Users();
      user.id = userId;
      userRepository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.findOne({ id: userId });

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);
      const userId = uuidv4();

      await expect(service.findOne({ id: userId })).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of UserDTOs', async () => {
      const userData = [new Users(), new Users()];
      userRepository.find = jest.fn().mockResolvedValue(userData);

      const result = await service.findAllUsers();

      expect(result).toHaveLength(2);
    });
  });

  describe('getUserById', () => {
    it('should return a UserDTO when user found', async () => {
      const userId = uuidv4();
      const user = new Users();
      user.id = userId;
      userRepository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.getUserById(userId);

      expect(result).toBeDefined();
      expect(result.id).toEqual(user.id);
    });

    it('should throw NotFoundException when user not found', async () => {
      const userId = uuidv4();
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.getUserById(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create a user and return UserDTO', async () => {
      const createUserInput: CreateUserInput = {
        email: 'test@example.com',
        password: '123@abc',
        roles: RolesEnum.ADMIN,
      };
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);
      userRepository.create = jest.fn().mockReturnValue(createUserInput);
      userRepository.save = jest.fn().mockResolvedValue(createUserInput);

      const result = await service.createUser(createUserInput);

      expect(result).toEqual(expect.objectContaining(createUserInput));
    });

    it('should throw UnauthorizedException when user already exists', async () => {
      const existingUser = new Users();
      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);

      await expect(
        service.createUser({
          email: 'test@example.com',
          password: '123@abc',
          roles: RolesEnum.ADMIN,
        }),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw InternalServerErrorException when user creation fails', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);
      userRepository.create = jest.fn().mockReturnValue({});
      userRepository.save = jest.fn().mockResolvedValue(undefined);

      await expect(
        service.createUser({
          email: 'test@example.com',
          password: '123@abc',
          roles: RolesEnum.ADMIN,
        }),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('updateUser', () => {
    it('should update a user and return UserDTO', async () => {
      const userId = uuidv4();
      const updateUserInput: UpdateUserInput = {
        id: userId,
        email: 'test@example.com',
        password: '123@abc',
        roles: RolesEnum.ADMIN,
      };
      const existingUser = new Users();
      existingUser.id = userId;
      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);
      userRepository.create = jest.fn().mockReturnValue(updateUserInput);
      userRepository.save = jest.fn().mockResolvedValue(updateUserInput);

      const result = await service.updateUser(userId, updateUserInput);

      expect(result).toEqual(expect.objectContaining(updateUserInput));
    });

    it('should throw NotFoundException when user not found', async () => {
      const userId = uuidv4();
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(
        service.updateUser(userId, {
          id: userId,
          email: 'updated@example.com',
        }),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = uuidv4();
      const user = new Users();
      user.id = userId;
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      userRepository.softDelete = jest.fn().mockResolvedValue(true);

      const result = await service.deleteUser(userId);

      expect(result).toEqual(true);
    });

    it('should return false if user deletion fails', async () => {
      const userId = uuidv4();
      const user = new Users();
      user.id = userId;
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      userRepository.softDelete = jest.fn().mockResolvedValue(false);

      const result = await service.deleteUser(userId);

      expect(result).toEqual(false);
    });
  });

  describe('updateLastLogin', () => {
    it('should update last login time', async () => {
      const userId = uuidv4();
      const user = new Users();
      user.id = userId;
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      userRepository.save = jest.fn().mockResolvedValue(user);

      const result = await service.updateLastLogin(userId);

      expect(result.lastLogin).toBeDefined();
    });

    it('should throw NotFoundException when user not found', async () => {
      const userId = uuidv4();
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.updateLastLogin(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
