import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  username: string;

  // We don't expose password in GraphQL responses
  password: string;
} 