import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { SearchBooksInput } from './dto/search-books.input';
import { AuthGuard } from '../auth/auth.guard'; //Only allow access if the user passes the guard check (e.g. is logged in).

@Resolver(() => Book) //Declares that this resolver handles GraphQL operations related to the Book type.
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  // Protected routes - require authentication
  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @Context() context
  ) {
    return this.bookService.create(createBookInput, context.req.user.username);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @Context() context
  ) {
    return this.bookService.update(updateBookInput, context.req.user.username);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  removeBook(
    @Args('id', { type: () => Int }) id: number,
    @Context() context // Access the request context to get user information
  ) {
    return this.bookService.remove(id, context.req.user.username);
  }

  // Public routes - no authentication needed
  @Query(() => [Book], { name: 'books' }) //This means the query will return an array of Book objects.
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findOne(id);
  }

  @Query(() => [Book], { name: 'searchBooks' })
  searchBooks(@Args('searchInput') searchInput: SearchBooksInput) {
    return this.bookService.search(searchInput);
  }
}
