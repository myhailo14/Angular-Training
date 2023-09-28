import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Book } from '../models/book.model';
import { Payment } from '../models/payment.model';
import { mockBooksArray } from '../tests/test.helpers';


describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let api_url: string = 'https://localhost:7242';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all books', () => {
    service.getAllBooks().subscribe((books) => {
      expect(books).toEqual(mockBooksArray);
    });

    const req = httpMock.expectOne(`${api_url}/Books`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooksArray);
  });

  it('should retrieve a specific book by id', () => {
    const bookId = 1;

    service.getBook(bookId).subscribe((book) => {
      expect(book).toEqual(mockBooksArray[bookId]);
    });

    const req = httpMock.expectOne(`${api_url}/Books/${bookId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooksArray[bookId]);
  });

  it('should buy a book', () => {
    const mockResponse = {}; // Mock data
    const paymentDetails: Payment = new Payment(0, 0);

    service.buyBook(paymentDetails).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${api_url}/Books/buy`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should rent a book', () => {
    const mockResponse = {};
    const paymentDetails: Payment = new Payment(0, 0);

    service.rentBook(paymentDetails).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${api_url}/Books/rent`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should calculate rent price correctly', () => {
    const rentDuration = 10;
    const expectedPrice = Math.ceil(rentDuration / 7) * 20;
    const actualPrice = service.getRentPrice(rentDuration);
    expect(actualPrice).toEqual(expectedPrice);
  });
});
