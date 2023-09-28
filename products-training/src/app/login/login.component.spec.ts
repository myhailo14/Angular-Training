import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatError } from '@angular/material/form-field';
import { Credentials } from '../models/credentials.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let correctCredentials: Credentials = {
    email: 'test@mail.com',
    password: 'Qwerty1',
  };

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockAuthService.login = jasmine
      .createSpy('login')
      .and.callFake((credentials: Credentials) => {
        if (
          credentials.email == correctCredentials.email &&
          credentials.password == correctCredentials.password
        ) {
          return of(true);
        }
        return of(false);
      });
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid on empty fields', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
    emailControl?.setValue('');
    passwordControl?.setValue('');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should mark form as valid on correct values', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('test@mail.com');
    passwordControl?.setValue('Qwerty1');

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should navigate further on success login', fakeAsync(() => {
    mockAuthService.login = jasmine
      .createSpy('login')
      .and.callFake((credentials: Credentials) => {
        if (credentials.email == correctCredentials.email) {
          console.log(credentials);
          return of(true);
        }
        console.log('false' + credentials);
        return of(false);
      });
    mockRouter.navigate = jasmine.createSpy('navigate');
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('test@mail.com');
    passwordControl?.setValue('Qwerty1');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', null);
    tick();

    expect(mockRouter.navigate).toHaveBeenCalled();
  }));

  it('should navigate further on success login', fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('test@mail.com');
    passwordControl?.setValue('Qwerty1');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', null);
    tick();

    expect(mockRouter.navigate).toHaveBeenCalled();
  }));

  it('should not navigate further on wrong login', fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('wrong@mail.com');
    passwordControl?.setValue('WrongPass1');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', null);
    tick();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));

  describe('isDisabledSubmit', ()=> {
     it('should return loginForm validity if wasFirstSubmit is true', () => {
    component.wasFirstSubmit = true;
    // form is empty for now
    expect(component.isDisabledSubmit()).toBeTrue();

    component.email.setValue('test@mail.com');
    component.password.setValue('Qwerty1');
    expect(component.isDisabledSubmit()).toBeFalse();
  });

  it('should return false if wasFirstSubmit is false and controls are untouched', () => {
    component.wasFirstSubmit = false;
    expect(component.isDisabledSubmit()).toBeFalse();
  });

  it('should return true if wasFirstSubmit is false and email is touched and invalid', () => {
    component.wasFirstSubmit = false;
    component.email.setValue('');
    component.email.markAsTouched();
    expect(component.isDisabledSubmit()).toBeTrue();
  });

  it('should return true if wasFirstSubmit is false and password is touched and invalid', () => {
    component.wasFirstSubmit = false;
    component.password.setValue('');
    component.password.markAsTouched();
    expect(component.isDisabledSubmit()).toBeTrue();
  });

  })

 
  describe('getPasswordError', () => {
    it('should return "Enter password" if password is required', () => {
      component.password.setErrors({ required: true });
      expect(component.getPasswordError()).toBe('Enter password');
    });

    it('should return error message if password is invalid', () => {
      component.password.setErrors({ invalidPassword: true });
      expect(component.getPasswordError()).toBe(
        'Password must contain at least 5 character including a-z A-Z 0-9'
      );
    });

    it('should return empty string if password has no errors', () => {
      component.password.setErrors(null);
      expect(component.getPasswordError()).toBe('');
    });
  });

  describe('getEmailError', () => {
    it('should return "Enter email" if email is required', () => {
      component.email.setErrors({ required: true });
      expect(component.getEmailError()).toBe('Enter email');
    });

    it('should return "Wrong email format" if email is invalid', () => {
      component.email.setErrors({ invalidEmail: true });
      expect(component.getEmailError()).toBe('Wrong email format');
    });

    it('should return empty string if email has no errors', () => {
      component.email.setErrors(null);
      expect(component.getEmailError()).toBe('');
    });
  });
});
