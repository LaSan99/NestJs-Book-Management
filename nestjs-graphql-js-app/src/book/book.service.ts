import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { SearchBooksInput } from './dto/search-books.input';
import { Book } from './book.entity';

@Injectable() //Makes this service usable in other parts of your app
export class BookService {
  private books: Book[] = [];
  private idCounter = 1;

  create(createBookInput: CreateBookInput): Book {
    const newBook = {
      id: this.idCounter++,
      ...createBookInput, // Spread operator to copy properties from createBookInput
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

  update(updateBookInput: UpdateBookInput): Book {
    const book = this.findOne(updateBookInput.id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${updateBookInput.id} not found`);
    }
    Object.assign(book, updateBookInput); //copies all fields from updateBookInput into the found book.
    return book;
  }

  remove(id: number): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
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
