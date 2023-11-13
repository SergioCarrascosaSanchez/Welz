import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  signUp(userPassword: UserPassword) {
    this.http
      .post<AuthResponse>(`${this.urlSignUp}${this.apiKey}`, userPassword)
      .subscribe((response) => {
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('id', response.localId);
        console.log(response);
        this.http
          .put<UserData>(`${this.urlStorage}/${response.localId}.json`, {
            username: response.localId,
            balance: 0,
            budget: {
              incomeCategories: [],
              savingCategories: [],
              expensesCategories: [],
            },
            accounts: [],
            transactions: [],
          })
          .subscribe((response) => {
            console.log(response);
            this.router.navigate(['/user']);
          });
      });
  }

  logIn(userPassword: UserPassword) {
    this.http
      .post<AuthResponse>(`${this.urlLogIn}${this.apiKey}`, userPassword)
      .subscribe((response) => {
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('id', response.localId);
        this.router.navigate(['/user']);
      });
  }

  //https://firebase.google.com/docs/reference/rest/auth?hl=es-419#section-create-email-password
}
