import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { Credentials } from '../models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  auth: AuthService;
  wasFirstSubmit: boolean = false;

  constructor(fb: FormBuilder, auth: AuthService, private router: Router) {
    this.loginForm = fb.group({
      email: [
        '',
        Validators.compose([Validators.required, this.emailValidator])
      ],
      password: [
        '',
        Validators.compose([Validators.required, this.passwordValidator])
      ],
    });
    this.email = this.loginForm.controls['email'] as FormControl;
    this.password = this.loginForm.controls['password'] as FormControl;

    this.auth = auth;
  }

  ngOnInit(): void {}

  onSubmit(credentials: Credentials): void {
    this.wasFirstSubmit = true;

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.auth.login(credentials).subscribe((response) => {
      if (response) {
        this.router.navigate(['/home/books']);
      }
      this.loginForm.setErrors({ wrongCredentials: true });
    });
  }

  isDisabledSubmit(): boolean {
    if (this.wasFirstSubmit) {
      return this.loginForm.invalid;
    } else {
      return this.loginForm.invalid 
        && ((this.email.touched && this.email.invalid) 
        || (this.password.touched && this.password.invalid));
    }
  }

  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!control.value.match(emailPattern)) {
      return { invalidEmail: true };
    }
    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!control.value.match(passwordPattern)) {
      return { invalidPassword: true };
    }
    return null;
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'Enter password';
    }

    return this.password.hasError('invalidPassword')
      ? 'Password must contain at least 5 character including a-z A-Z 0-9'
      : '';
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'Enter email';
    }

    return this.email.hasError('invalidEmail') ? 'Wrong email format' : '';
  }
}
