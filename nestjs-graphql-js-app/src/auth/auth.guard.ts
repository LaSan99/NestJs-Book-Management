import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {  //This method runs automatically to decide if the request passes or not
    const ctx = GqlExecutionContext.create(context); // Converts the execution context to a GraphQL context
    const req = ctx.getContext().req; // Get the request object from the context

    // Get token from header
    const token = req.headers.authorization?.replace('Bearer ', ''); //Removes the 'Bearer ' prefix to get the token only.
    if (!token) {
      throw new UnauthorizedException('Please login first');
    }

    // Validate token
    const user = this.authService.validateToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
} 