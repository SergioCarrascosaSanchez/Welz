import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';
import { ALERT_TYPES } from '../alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  constructor(private authService: AuthService) {}

  type: AUTH_FORM_TYPES = AUTH_FORM_TYPES.LOGIN;

  error = null;
  errorAlertType = ALERT_TYPES.danger;
  private errorSubscription: Subscription;

  notSignedUpText = NotSignedUpText;
  signedUpText = SignedUpText;
  notSignedUpTitle = NotSignedUpTitle;
  signedUpTitle = SignedUpTitle;

  authForm: FormGroup;

  onSubmit() {
    if (!this.authForm.invalid) {
      if (this.isSignUp()) {
        if (
          this.authForm.controls['password'].value !==
          this.authForm.controls['password2'].value
        ) {
          this.error = PasswordsError;
        } else {
          this.onSignUp();
        }
      } else {
        this.onLogIn();
      }
    } else {
      this.manageErrors();
    }
  }

  onSignUp() {
    this.authService.signUp({
      email: this.authForm.controls['email'].value,
      username: this.authForm.controls['username'].value,
      password: this.authForm.controls['password'].value,
      returnSecureToken: true,
    });
  }

  onLogIn() {
    this.authService.logIn({
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value,
      returnSecureToken: true,
    });
  }

  isSignUp() {
    return this.type === AUTH_FORM_TYPES.SIGNUP;
  }

  switchType() {
    if (this.isSignUp()) {
      this.type = AUTH_FORM_TYPES.LOGIN;
      this.createForm();
    } else {
      this.type = AUTH_FORM_TYPES.SIGNUP;
      this.createForm();
      this.setSignUpValidators();
    }
  }

  createForm() {
    this.authForm = new FormGroup({
      email: new FormControl<string>('', [Validators.email, EmptyValidator]),
      username: new FormControl<string>(''),
      password: new FormControl<string>('', [
        Validators.minLength(8),
        EmptyValidator,
      ]),
      password2: new FormControl<string>(''),
    });
  }

  setSignUpValidators() {
    this.authForm.controls['password2'].setValidators([
      Validators.minLength(8),
      EmptyValidator,
    ]);
    this.authForm.controls['username'].setValidators([EmptyValidator]);
  }

  manageErrors() {
    let errorArray = [];
    this.error = '';
    Object.values(this.authForm.controls).forEach(
      (formControl: FormControl) => {
        if (formControl.errors) {
          errorArray = [...errorArray, ...Object.keys(formControl.errors)];
        }
      }
    );
    if (errorArray.includes('emptyValue')) {
      this.error = EmptyError;
      return;
    }
    if (errorArray.includes('email')) {
      this.error = EmailError;
      return;
    }
    if (errorArray.includes('minlength')) {
      this.error = MinError;
      return;
    }
  }

  ngOnInit() {
    this.createForm();
    if (this.isSignUp()) {
      this.setSignUpValidators();
    }
    this.errorSubscription = this.authService.error.subscribe((msg) => {
      this.error = msg;
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}

export enum AUTH_FORM_TYPES {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export const EmptyError: string = 'Debes rellenar todos los campos.';
export const EmailError: string = 'El formato del email es incorrecto';
export const MinError: string = 'La contraseña debe tener al menos 8 digitos.';
export const PasswordsError: string = 'Las contraseñas deben coincidir.';
export const NotSignedUpText: string = 'No tengo cuenta aún';
export const SignedUpText: string = 'Ya tengo una cuenta';
export const NotSignedUpTitle: string = 'Crear una cuenta';
export const SignedUpTitle: string = 'Iniciar sesion';
