import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {
    
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(response => this.books = response);
  }
}
