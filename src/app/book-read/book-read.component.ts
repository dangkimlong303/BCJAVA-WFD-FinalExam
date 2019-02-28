import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.scss']
})
export class BookReadComponent implements OnInit {


  book: Book;
  bookList: Book[] = [];

  constructor(private service: BookService) {
  }

  ngOnInit() {
    this.service.getBook().subscribe(next => this.bookList = next, error => this.bookList = []);
  }

  unRead(i) {
    this.book = this.bookList[i];
    const data = {
      ...this.book,
      read: false
    };
    this.service.updateBook(data).subscribe(() => {
      this.ngOnInit();
    });
  }

}
