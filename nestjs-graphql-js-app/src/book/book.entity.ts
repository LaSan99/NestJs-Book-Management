import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()  //I’m defining a type called Book that can be used in GraphQL queries.
export class Book {
  @Field(() => Int)  //this will be a GraphQL Integer field
  id: number;

  @Field() 
  title: string;

  @Field()
  author: string;

  @Field(() => Int)  //this will be a GraphQL Integer field
  publishedYear: number;

  @Field()
  genre: string;

  @Field()
  createdBy: string;
}
