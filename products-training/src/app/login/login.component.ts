import { Component, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  auth: AuthService;
  wasFirstSubmit: boolean = false;

  constructor(
    fb: FormBuilder,
    auth: AuthService,
    private router: Router
  ) {
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
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];

    this.auth = auth;
  }

  ngOnInit(): void {}

  onSubmit(value: any): void {
    this.wasFirstSubmit = true;

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.auth.login(value).subscribe(response => {
      if(response){
        this.router.navigate(['/home']);
      }
      this.loginForm.setErrors({wrongCredentials: true})
    });
    
  }

  isDisabledSubmit(): boolean {
    if(this.wasFirstSubmit){
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