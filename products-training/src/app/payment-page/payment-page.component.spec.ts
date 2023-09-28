// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { Location } from '@angular/common';
// import { PaymentPageComponent } from './payment-page.component';
// import { BookService } from '../services/book.service';
// import { of } from 'rxjs';
// import { Book } from '../models/book.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AppStore } from '../stores/app.store';
// import { SharedModule } from '../shared/shared.module';
// import { BookModule } from '../book/book.module';
// import { mockBooksArray } from '../tests/test.helpers';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// const mockActivatedRoute = {
//   params: of({ operation: 'buy' }),
// };

// const mockRouter = {
//   navigate: jasmine.createSpy('navigate'),
// };

// const mockBookService = {
//   getBook: jasmine.createSpy('getBook').and.returnValue(of(mockBooksArray[1])),
// };

// const mockLocation = {
//   back: jasmine.createSpy('back'),
// };

// const mockStore = {
//   select: jasmine.createSpy('select').and.returnValue(of({})),
//   dispatch: jasmine.createSpy('dispatch'),
//   getState: jasmine.createSpy('getState').and.returnValue(0),
// };

// describe('PaymentPageComponent', () => {
//   let component: PaymentPageComponent;
//   let fixture: ComponentFixture<PaymentPageComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [PaymentPageComponent],
//       providers: [
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: Router, useValue: mockRouter },
//         { provide: BookService, useValue: mockBookService },
//         { provide: Location, useValue: mockLocation },
//         { provide: AppStore, useValue: mockStore }
//       ],
//       imports: [SharedModule, BookModule, ReactiveFormsModule, FormsModule]
//     });
//     fixture = TestBed.createComponent(PaymentPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', fakeAsync(() => {
//     tick();
//     expect(component).toBeTruthy();
//   }));
// });
