import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  book: Book;
  bookForm: FormGroup;

  constructor(private service: BookService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      read: ['']
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getBookById(id).subscribe(next => {
      this.book = next;
      this.bookForm.patchValue(this.book);
    }, error => this.book = null);
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const {value} = this.bookForm;
      const data = {
        ...this.book,
        ...value
      };
      this.service.updateBook(data).subscribe(next => this.router.navigate([`/book`]), error => console.log(error));
    }
  }

}
