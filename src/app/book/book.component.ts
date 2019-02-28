import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: Book;
  bookList: Book[] = [];

  bookForm: FormGroup;

  constructor(private service: BookService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      read: [''],
    });
    this.service.getBook().subscribe(next => this.bookList = next, error => this.bookList = []);
  }

  read(i) {
    this.book = this.bookList[i];
    const data = {
      ...this.book,
      read: true
    };
    this.service.updateBook(data).subscribe(() => {
      this.ngOnInit();
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const {value} = this.bookForm;
      this.service.createBook(value).subscribe(() => {
        this.router.navigate(['/book']);
        this.ngOnInit();
      });
    }
  }
}
