import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            updateLastLogin: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user and token if credentials are valid', async () => {
      const mockUserId = uuidv4();
      const mockUser = {
        id: mockUserId,
        email: 'test@example.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastLogin: null,
      };
      const mockAuthInput = { email: 'test@example.com', password: 'password' };

      userService.findOne = jest.fn().mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      jwtService.sign = jest.fn().mockReturnValue('mockToken');

      const result = await service.validateUser(mockAuthInput);

      expect(result.user).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        deletedAt: mockUser.deletedAt,
        lastLogin: null,
      });
      expect(result.token).toEqual('mockToken');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const mockAuthInput = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      userService.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.validateUser(mockAuthInput)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUserId = uuidv4();
      const mockUser = {
        id: mockUserId,
        email: 'test@example.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastLogin: null,
      };
      const mockAuthInput = {
        email: 'test@example.com',
        password: 'invalidPassword',
      };

      userService.findOne = jest.fn().mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      await expect(service.validateUser(mockAuthInput)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
