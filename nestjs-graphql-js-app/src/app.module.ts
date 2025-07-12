import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }), // Add this line to include request context
    }),
    BookModule,
    AuthModule,
  ],
})
export class AppModule {}


/*
Sets up GraphQL using Apollo

Tells NestJS to auto-generate the GraphQL schema

Gives GraphQL access to HTTP request (for auth)

Loads your Book and Auth modules
*/