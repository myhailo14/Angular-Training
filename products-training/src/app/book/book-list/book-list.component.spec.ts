import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookService } from 'src/app/services/book.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockBooksArray } from 'src/app/tests/test.helpers';
import { of } from 'rxjs';
import { BookModule } from '../book.module';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService = jasmine.createSpyObj<BookService>('bookService', ['getAllBooks']);

  beforeEach(() => {
    mockBookService.getAllBooks = jasmine.createSpy('getAllBooks').and.returnValue(of(mockBooksArray));
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [SharedModule, BookModule],
      providers: [{provide: BookService, useValue: mockBookService}]
    });
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all books', () => {
    component.books = mockBooksArray;
    fixture.detectChanges();
    const bookTitles = fixture.nativeElement.querySelectorAll('app-book-card');
    expect(bookTitles.length).toBe(mockBooksArray.length);

    for (let i = 0; i < mockBooksArray.length; i++) {
      expect(bookTitles[i].textContent).toContain(mockBooksArray[i].name);
    }
  })
});
