import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  constructor(private authService: AuthService) {}

  type: AUTH_FORM_TYPES = AUTH_FORM_TYPES.LOGIN;

  authForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.email, EmptyValidator]),
    password: new FormControl<string>('', [
      Validators.minLength(8),
      EmptyValidator,
    ]),
    password2: new FormControl<string>(''),
  });

  ngOnInit() {
    if (this.isSignUp()) {
      this.authForm.controls['password2'].setValidators([
        Validators.minLength(8),
        EmptyValidator,
      ]);
    }
  }

  onSubmit() {
    if (this.isSignUp()) {
      this.onSignUp();
    } else {
      this.onLogIn();
    }
  }

  onSignUp() {
    this.authService.signUp({
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value,
    });
  }

  onLogIn() {
    this.authService.logIn({
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value,
    });
  }

  isSignUp() {
    return this.type === AUTH_FORM_TYPES.SIGNUP;
  }

  switchType() {
    if (this.isSignUp()) {
      this.type = AUTH_FORM_TYPES.LOGIN;
    } else {
      this.type = AUTH_FORM_TYPES.SIGNUP;
    }
  }
}

export enum AUTH_FORM_TYPES {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
