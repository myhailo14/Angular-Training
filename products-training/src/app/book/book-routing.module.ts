import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { PaymentPageComponent } from '../payment-page/payment-page.component';
import { ResultPageComponent } from '../result-page/result-page.component';

export const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookComponent },
  { path: 'books/:id/:operation', component: PaymentPageComponent },
  { path: 'books/:id/:operation/result', component: ResultPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
