import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Resolver() //Marks this class as a GraphQL resolver.
export class AuthResolver {
  constructor(private authService: AuthService) {} //Injects the AuthService into this resolver.

  @Mutation(() => User)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {  //function will return a Promise that will eventually give back a User object.
    return this.authService.register(username, password);
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    const { token } = await this.authService.login(username, password); 
    return token;
  }
} 