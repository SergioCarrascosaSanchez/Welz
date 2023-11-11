import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/interfaces/auth-response.model';
import { UserPassword } from 'src/app/interfaces/user-password';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private urlSignUp =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private urlLogIn =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private apiKey = environment.API_KEY;

  signUp(userPassword: UserPassword) {
    this.http
      .post<AuthResponse>(`${this.urlSignUp}${this.apiKey}`, userPassword)
      .subscribe((response) => console.log(response));
  }

  logIn(userPassword: UserPassword) {
    this.http
      .post<AuthResponse>(`${this.urlLogIn}${this.apiKey}`, userPassword)
      .subscribe((response) => console.log(response));
  }
}
