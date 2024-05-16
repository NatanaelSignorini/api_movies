import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  getRequest(context: ExecutionContext): Request {
    const httpContext = context.switchToHttp();
    return httpContext.getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }

    await this.canActivate(context);

    if (roles.includes('ANY')) {
      return true;
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.roles);
  }
}
