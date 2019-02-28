import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookComponent} from './book/book.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {BookReadComponent} from './book-read/book-read.component';

const routes: Routes = [{
  path: 'book',
  component: BookComponent
}, {
  path: 'book/:id/edit',
  component: BookEditComponent
}, {
  path: 'book/read',
  component: BookReadComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
