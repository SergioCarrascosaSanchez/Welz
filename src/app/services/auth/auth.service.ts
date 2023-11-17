import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponse } from 'src/app/interfaces/auth-response.model';
import { UserPassword } from 'src/app/interfaces/user-password';
import { UserData } from 'src/app/interfaces/userData.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private urlStorage =
    'https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app/';
  private urlSignUp =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private urlLogIn =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private apiKey = environment.API_KEY;

  private errorSubject = new BehaviorSubject<string | null>(null);
  error = this.errorSubject.asObservable();

  signUp(userPassword: UserPassword) {
    this.http
      .post<AuthResponse>(`${this.urlSignUp}${this.apiKey}`, userPassword)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.error.message === 'EMAIL_EXISTS') {
            this.errorSubject.next(EMAIL_EXISTS);
          } else {
            this.errorSubject.next(UNKNOWN_ERROR);
          }
          return throwError(error.error.error.message);
        })
      )
      .subscribe((response) => {
        console.log(response);
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('id', response.localId);
        this.errorSubject.next(null);
        this.http
          .put<UserData>(
            `${this.urlStorage}/${response.localId}.json`,
            {
              username: response.localId,
              balance: 0,
              budget: {
                incomeCategories: [],
                savingCategories: [],
                expensesCategories: [],
              },
              accounts: [],
              transactions: [],
            },
            {
              params: new HttpParams().set(
                'auth',
                localStorage.getItem('token')
              ),
            }
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.errorSubject.next(UNKNOWN_ERROR);
              return throwError(error.error.error.message);
            })
          )
          .subscribe((response) => {
            console.log(response);
            this.errorSubject.next(null);
            this.router.navigate(['/user']);
          });
      });
  }

  logIn(userPassword: UserPassword) {
    this.http
      .post<AuthResponse>(`${this.urlLogIn}${this.apiKey}`, userPassword)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.error.error.message);
          if (error.error.error.message === 'INVALID_LOGIN_CREDENTIALS') {
            this.errorSubject.next(INVALID_LOGIN_CREDENTIALS);
          } else {
            this.errorSubject.next(UNKNOWN_ERROR);
          }
          return throwError(error.error.error.message);
        })
      )
      .subscribe((response) => {
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('id', response.localId);
        this.router.navigate(['/user']);
      });
  }

  //https://firebase.google.com/docs/reference/rest/auth?hl=es-419#section-create-email-password
}

export const EMAIL_EXISTS = 'El correo ya está en uso';
export const UNKNOWN_ERROR = 'Ha ocurrido un error al procesar la solicitud';
export const INVALID_LOGIN_CREDENTIALS =
  'El correo electrónico o la contraseña son incorrectos';
