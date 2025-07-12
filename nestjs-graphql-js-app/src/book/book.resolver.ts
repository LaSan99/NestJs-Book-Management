import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.create(createBookInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  removeBook(@Args('id', { type: () => Int }) id: number) {  // Use Int type for ID Maps that value to the id: number parameter in TypeScript
    return this.bookService.remove(id);
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
