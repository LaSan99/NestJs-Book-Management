import { InputType, Field } from '@nestjs/graphql';

@InputType() //define an input object for GraphQL (used in queries or mutations).
export class SearchBooksInput {
  @Field({ nullable: true })
  title?: string;  //optional field for searching by book title

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  genre?: string;
} 