import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { AuthService } from '../services/authentication.service';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let mockAuthService = jasmine.createSpyObj<AuthService>('authService', [
    'logout',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
