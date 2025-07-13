import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Please login first');
    }

    // Validate token
    const user = this.authService.validateToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Add user to request object
    req.user = user;

    return true;
  }
} 