import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({  //groups everything related to one part of your app.
  imports: [AuthModule],
  providers: [BookService, BookResolver],
})
export class BookModule {}
