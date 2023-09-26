import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RentTermDialogComponent } from 'src/app/rent-term-dialog/rent-term-dialog.component';
import { Store } from 'redux';
import { AppState } from 'src/app/stores/app.state';
import { AppStore } from 'src/app/stores/app.store';
import { CHANGE_TERM } from 'src/app/stores/rentTerm.actions';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  id: number;
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private location: Location,
    public dialog: MatDialog,
    @Inject(AppStore) private store: Store<AppState>
  ) {
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.bookService
      .getBook(this.id)
      .subscribe((response) => (this.book = response));
  }

  onBuyClick() {
    this.router.navigate(['./', 'buy'], { relativeTo: this.route });
  }

  onRentClick(): void {
    const dialogRef = this.dialog.open(RentTermDialogComponent, {
      data: {endDate: Date },
    });

    dialogRef.afterClosed().subscribe((result: Date) => {
      if (result) {
        this.store.dispatch({type: CHANGE_TERM, payload: result})
        this.router.navigate(['./', 'rent'], { relativeTo: this.route });
      }
    });
  }

  back(): void {
    this.location.back();
  }
}
