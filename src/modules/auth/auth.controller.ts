import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CurrentUser } from '@apiBase/common/decorators/currentUser.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import type { AuthType, TokenValidType } from './dto/auth.type';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticated')
  @ApiOperation({ summary: 'Login' })
  public async authenticated(@Body() data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
    };
  }

  @Get('isTokenValid/:token')
  @ApiOperation({ summary: 'Valid Token' })
  public async isTokenValid(
    @Param('token') token: string,
  ): Promise<TokenValidType> {
    return await this.authService.validateToken(token);
  }

  @Get('me')
  @ApiOperation({ summary: 'Me' })
  public async me(@CurrentUser() user: UserDTO): Promise<UserDTO> {
    return user;
  }
}
