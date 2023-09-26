import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { BookCardComponent } from './book-card/book-card.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../services/book.service';
import { RouterModule } from '@angular/router';
import { BookRoutingModule } from './book-routing.module';
import { MatCarouselModule } from 'ng-mat-carousel';



@NgModule({
  declarations: [
    BookListComponent,
    BookComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    BookRoutingModule
  ],
  exports: [BookListComponent, BookCardComponent],
  providers: []
})
export class BookModule { }
