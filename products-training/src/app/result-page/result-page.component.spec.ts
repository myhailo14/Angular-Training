import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ResultPageComponent } from './result-page.component';
import { AppState } from '../stores/app.state';
import { StoreModule } from '@ngrx/store';
import { AppStore } from '../stores/app.store';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatCardSubtitle } from '@angular/material/card';

let changeInState: number | null = 0;
const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(of({})),
  dispatch: jasmine.createSpy('dispatch'),
  getState: jasmine.createSpy('getState').and.returnValue(changeInState),
};

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultPageComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: AppStore, useValue: mockStore }],
    });
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render change subtitle', () => {
    changeInState = 5;

    fixture.detectChanges();
    const matCardSubtitleElement = fixture.debugElement.query(
      By.directive(MatCardSubtitle)
    );
    expect(matCardSubtitleElement).toBeFalsy();
  });

  it('should not render change subtitle', () => {
    changeInState = null;

    fixture.detectChanges();
    const matCardSubtitleElement = fixture.debugElement.query(
      By.directive(MatCardSubtitle)
    );
    expect(matCardSubtitleElement).toBeFalsy();
  });
});
