import { CurrentUser } from '@apiBase/common/decorators/currentUser.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserDTO } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import type { AuthType, TokenValidType } from './dto/auth.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticated')
  public async authenticated(@Body() data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
    };
  }

  @Get('isTokenValid/:token')
  public async isTokenValid(
    @Param('token') token: string,
  ): Promise<TokenValidType> {
    return await this.authService.validateToken(token);
  }

  @Get('me')
  public async me(@CurrentUser() user: UserDTO): Promise<UserDTO> {
    return user;
  }
}
