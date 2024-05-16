import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            validateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('authenticated', () => {
    it('should return a valid token upon successful authentication', async () => {
      const authInput = { username: 'testUser', password: 'testPassword' };
      const expectedResult = { token: 'generatedToken' };

      (authService.validateUser as jest.Mock).mockResolvedValueOnce(
        expectedResult,
      );

      const result = await controller.authenticated(authInput);

      expect(result).toEqual(expectedResult);
      expect(authService.validateUser).toHaveBeenCalledWith(authInput);
    });
  });

  describe('isTokenValid', () => {
    it('should return true for a valid token', async () => {
      const token = 'validToken';
      const expectedResult = { isValid: true };

      (authService.validateToken as jest.Mock).mockResolvedValueOnce(
        expectedResult,
      );

      const result = await controller.isTokenValid(token);

      expect(result).toEqual(expectedResult);
      expect(authService.validateToken).toHaveBeenCalledWith(token);
    });

    it('should return false for an invalid token', async () => {
      const token = 'invalidToken';
      const expectedResult = { isValid: false };

      (authService.validateToken as jest.Mock).mockResolvedValueOnce(
        expectedResult,
      );

      const result = await controller.isTokenValid(token);

      expect(result).toEqual(expectedResult);
      expect(authService.validateToken).toHaveBeenCalledWith(token);
    });
  });

  describe('me', () => {
    it('should return the current user', async () => {
      const user = { id: uuidv4(), username: 'testUser' };

      const result = await controller.me(user);

      expect(result).toEqual(user);
    });
  });
});
