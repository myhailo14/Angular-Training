import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.model';
import { ConfigService } from './config.service';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _url: string;
  private _headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this._url = inject(ConfigService).getApiUrl();
    this._headers = inject(ConfigService).getHeaders();
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this._url + '/Books').pipe(
      map(response =>  response)
    );
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this._url + '/Books/' + id );
  }

  buyBook(paymentDetails: Payment): Observable<any> {
    return this.http.put(this._url + '/Books/buy', paymentDetails, {headers: this._headers});
  }

  rentBook(paymentDetails: Payment): Observable<any> {
    return this.http.put(this._url + '/Books/rent', paymentDetails, {headers: this._headers});
  }

  getRentPrice(rentDuration: number) : number {
    return Math.ceil(rentDuration / 7) * 20;
  }
}
