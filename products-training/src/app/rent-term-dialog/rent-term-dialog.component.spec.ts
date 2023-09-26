import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentTermDialogComponent } from './rent-term-dialog.component';

describe('RentTermDialogComponent', () => {
  let component: RentTermDialogComponent;
  let fixture: ComponentFixture<RentTermDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentTermDialogComponent]
    });
    fixture = TestBed.createComponent(RentTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
