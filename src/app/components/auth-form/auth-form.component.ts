import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmptyValidator } from 'src/app/validators/empty-validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  type: AUTH_FORM_TYPES = AUTH_FORM_TYPES.SIGNUP;

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
    console.log('SignUp');
  }

  onLogIn() {
    console.log('LogIn');
  }

  isSignUp() {
    return this.type === AUTH_FORM_TYPES.SIGNUP;
  }
}

export enum AUTH_FORM_TYPES {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
