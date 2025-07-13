import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { SearchBooksInput } from './dto/search-books.input';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  private books: Book[] = [];
  private idCounter = 1;

  create(createBookInput: CreateBookInput, username: string): Book {
    const newBook = {
      id: this.idCounter++,
      ...createBookInput,
      createdBy: username,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  update(updateBookInput: UpdateBookInput, username: string): Book {
    const book = this.findOne(updateBookInput.id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${updateBookInput.id} not found`);
    }
    
    // Check if the user is the creator of the book
    if (book.createdBy !== username) {
      throw new UnauthorizedException('You can only update your own books');
    }

    Object.assign(book, updateBookInput);
    return book;
  }

  remove(id: number, username: string): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Check if the user is the creator of the book
    if (this.books[index].createdBy !== username) {
      throw new UnauthorizedException('You can only delete your own books');
    }

    this.books.splice(index, 1);
    return true;
  }

  search(searchInput: SearchBooksInput): Book[] {
    return this.books.filter(book => {
      const matchesTitle = !searchInput.title || 
        book.title.toLowerCase().includes(searchInput.title.toLowerCase());
      
      const matchesAuthor = !searchInput.author || 
        book.author.toLowerCase().includes(searchInput.author.toLowerCase());
      
      const matchesGenre = !searchInput.genre || 
        book.genre.toLowerCase().includes(searchInput.genre.toLowerCase());

      return matchesTitle && matchesAuthor && matchesGenre;
    });
  }
}
