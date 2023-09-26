import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Payment } from '../models/payment.model';
import { Store } from 'redux';
import { AppState } from '../stores/app.state';
import { AppStore } from '../stores/app.store';
import { CLEAR_CHANGE, SET_CHANGE } from '../stores/change.actions';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  chosenBook: Book;

  bookId: number;
  operation: string;
  wasSubmit: boolean = false;
  chosenBookPrice: number = 0;

  paymentForm: FormGroup;
  sum: FormControl;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    @Inject(AppStore) private store: Store<AppState>
  ) {
    route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.operation = params['operation'];
    });
  }

  ngOnInit(): void {
    this.bookService.getBook(this.bookId).subscribe((response) => {
      this.chosenBook = response;
      this.chosenBookPrice =
        this.operation === 'buy'
          ? response.price
          : this.bookService.getRentPrice(this.getRentTerm());
      this.paymentForm = this.fb.group({
        sum: [
          '',
          Validators.compose([
            Validators.required,
            this.sumValidator(this.chosenBookPrice),
          ]),
        ],
      });
      this.sum = this.paymentForm.controls['sum'] as FormControl;
    });
  }

  onPayClick(payment: Payment): void {
    payment.bookId = this.chosenBook.id;
    this.wasSubmit = true;

    const diff = this.sum.value - this.chosenBookPrice;
    if (this.paymentForm.invalid) {
      return;
    }
    if (diff > 0) {
      this.store.dispatch({ type: SET_CHANGE, payload: diff });
    } else {
      this.store.dispatch({ type: CLEAR_CHANGE });
    }

    if (this.operation == 'buy') {
      this.bookService.buyBook(payment).subscribe((response) => {
        this.router.navigate([`result`], { relativeTo: this.route });
      });
    }
    if (this.operation == 'rent') {
      payment.rentTerm = this.store.getState().currentRentTerm;
      this.bookService.rentBook(payment).subscribe((response) => {
        this.router.navigate([`result`], { relativeTo: this.route });
      });
    }
  }

  onCancelClick(): void {
    this.location.back();
  }

  sumValidator(price: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value < price) {
        return { notEnough: true };
      }
      return null;
    };
  }

  getSumError() {
    if (this.sum.hasError('required')) {
      return 'Enter amount';
    }
    return this.sum.hasError('notEnough') ? 'Not enough money' : '';
  }

  prettifyString(stringValue: string): string {
    const lowercaseString = stringValue.toLowerCase();
    return lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);
  }

  getRentTerm(): number {
    return this.store.getState().currentRentTerm!;
  }
}

enum CheckResult {
  Equal,
  Lack,
  Plenty,
}
