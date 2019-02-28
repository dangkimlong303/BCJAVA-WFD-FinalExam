import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './book';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'http://localhost:8081/books';

  constructor(private http: HttpClient) {
  }

  getBook(count = -1): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL).pipe(map(res => res.filter((book, i) => i > count)));
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(`${this.API_URL}/${book.id}`, book);
  }
}
