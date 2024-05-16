import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import type { CreateUserInput } from './dto/create-user.input.dto';
import type { UpdateUserInput } from './dto/update-user.input.dto';
import type { UserDTO } from './dto/user.dto';
import { RolesEnum } from './enum/role.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsersAll', () => {
    it('should return an array of users', async () => {
      const users: UserDTO[] = [
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
          email: 'test@teste.com',
          lastLogin: new Date(),
        },
      ];
      jest.spyOn(userService, 'findAllUsers').mockResolvedValue(users);

      expect(await controller.getUsersAll()).toBe(users);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userId = uuidv4();
      const user: UserDTO = {
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        email: 'test@teste.com',
        lastLogin: new Date(),
      };
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      expect(await controller.getUserById(userId)).toBe(user);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userId = uuidv4();
      const newUser: UserDTO = { id: userId, email: 'test@teste.com' };
      const createUserInput: CreateUserInput = {
        email: 'test@teste.com',
        password: '123@abc',
        roles: RolesEnum.USER,
      };
      jest.spyOn(userService, 'createUser').mockResolvedValue(newUser);

      expect(await controller.createUser(createUserInput)).toBe(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = uuidv4();
      const updatedUser: UserDTO = { id: userId, email: 'test@teste.com' };
      const updateUserInput: UpdateUserInput = {
        id: userId,
        email: 'test@teste.com',
        password: '123@abc',
        roles: RolesEnum.USER,
      };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

      expect(await controller.updateUser(userId, updateUserInput)).toBe(
        updatedUser,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = uuidv4();
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(true);

      expect(await controller.deleteUser(userId)).toBe(true);
    });
  });
});
