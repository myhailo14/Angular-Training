import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      imports: [ SharedModule, RouterTestingModule ]
    });
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set background-color to #FFB6C1 if book state is "Sold"', () => {
    component.book = {...component.book, state: 'Sold' };
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.fixed-size-card')).nativeElement;
    expect(cardElement.style.backgroundColor).toBe('rgb(255, 182, 193)'); // #FFB6C1 in rgb
  });

  it('should set background-color to #D3D3D3 if book state is "Rented"', () => {
    component.book = {...component.book, state: 'Rented' };
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.fixed-size-card')).nativeElement;
    expect(cardElement.style.backgroundColor).toBe('rgb(211, 211, 211)'); // #D3D3D3 in rgb
  });

  it('should not set background-color if book state is neither "Sold" nor "Rented"', () => {
    component.book = {...component.book, state: 'Available' };
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.fixed-size-card')).nativeElement;
    expect(cardElement.style.backgroundColor).toBe(''); 
  });
});
