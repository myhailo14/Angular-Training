import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { BookComponent } from './book.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { of } from 'rxjs';
import { AppStore } from 'src/app/stores/app.store';
import { Book } from 'src/app/models/book.model';
import { RentTermDialogComponent } from 'src/app/rent-term-dialog/rent-term-dialog.component';
import { By } from '@angular/platform-browser';

const mockActivatedRoute = {
  params: of({ id: 'mockId' }),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockBookService = {
  getBook: jasmine.createSpy('getBook').and.returnValue(of(new Book())),
};

const mockLocation = {
  back: jasmine.createSpy('back'),
};

const mockMatDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(new Date()),
  }),
};

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(of({})),
  dispatch: jasmine.createSpy('dispatch'),
};

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: BookService, useValue: mockBookService },
        { provide: Location, useValue: mockLocation },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: AppStore, useValue: mockStore },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Location.back() when called', () => {
    component.back();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should navigate to the buy route when onBuyClick is called', () => {
    component.onBuyClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./', 'buy'], {
      relativeTo: mockActivatedRoute,
    });
  });

  it('should open the RentTermDialogComponent and navigate to the rent route when onRentClick is called', () => {
    component.onRentClick();

    expect(mockMatDialog.open).toHaveBeenCalledWith(RentTermDialogComponent, {
      data: { endDate: Date },
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_TERM',
      payload: jasmine.any(Date),
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./', 'rent'], {
      relativeTo: mockActivatedRoute,
    });
  });

  it('should have enabled button for available book', () => {
    component.book = { ...component.book, state: 'Available' };
    fixture.detectChanges();
    spyOn(component, 'onBuyClick').and.callThrough();

    const buyButton = fixture.debugElement.query(
      By.css('button[color="primary"]')
    );

    buyButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.onBuyClick).toHaveBeenCalled();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['./', 'buy'], {
      relativeTo: mockActivatedRoute,
    });
  });

  it('should disable the buy button when book is not available', () => {
    component.book = { ...component.book, state: 'Sold' };
    fixture.detectChanges();

    const buyButton = fixture.debugElement.query(
      By.css('button[color="primary"]')
    ).nativeElement;
    expect(buyButton.disabled).toBeTrue();
  });
});
