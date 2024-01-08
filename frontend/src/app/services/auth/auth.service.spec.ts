import { TestBed } from '@angular/core/testing';

import {
  AuthService,
  EMAIL_EXISTS,
  INVALID_LOGIN_CREDENTIALS,
  UNKNOWN_ERROR,
} from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPassword } from 'src/app/interfaces/user-password';
import { Component } from '@angular/core';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'user',
            component: DumbComponent,
          },
        ]),
      ],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signUp', () => {
    it('should sign up a user successfully', () => {
      const userPassword: UserPassword = {
        email: 'testuser',
        password: 'testpassword',
        returnSecureToken: true,
      };

      const token = 'fakeToken';
      const localId = 'fakeLocalId';

      let error: string | null = null;
      authService.error.subscribe((errorMsg) => {
        error = errorMsg;
      });

      authService.signUp(userPassword);

      const req = httpTestingController.expectOne(`${authService.url}/signup`);
      expect(req.request.method).toBe('POST');
      req.flush({ idToken: token, localId: localId });

      const storageReq = httpTestingController.expectOne(
        `${authService.url}/${localId}?auth=${token}`
      );
      expect(storageReq.request.method).toBe('PUT');
      storageReq.flush({});

      expect(localStorage.getItem('token')).toEqual(token);
      expect(localStorage.getItem('id')).toEqual(localId);
      expect(error).toBeNull();
    });

    it('should handle email already exists error during sign up', () => {
      const userPassword: UserPassword = {
        email: 'existinguser',
        password: 'testpassword',
        returnSecureToken: true,
      };

      const errorResponse = {
        detail: 'EMAIL_EXISTS',
      };

      let error: string | null;
      authService.error.subscribe((errorMsg) => (error = errorMsg));

      authService.signUp(userPassword);

      const req = httpTestingController.expectOne(`${authService.url}/signup`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });

      expect(error).toEqual(EMAIL_EXISTS);
    });

    it('should handle unknown error during sign up', () => {
      const userPassword: UserPassword = {
        email: 'testuser',
        password: 'testpassword',
        returnSecureToken: true,
      };

      const errorResponse = {
        detail: 'BAD_REQUEST',
      };

      let error: string | null = null;
      authService.error.subscribe((errorMsg) => (error = errorMsg));

      authService.signUp(userPassword);

      const req = httpTestingController.expectOne(`${authService.url}/signup`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });

      expect(error).toEqual(UNKNOWN_ERROR);
    });
  });

  describe('logIn', () => {
    it('should log in a user successfully', () => {
      let error: string | null = null;
      authService.error.subscribe((errorMsg) => (error = errorMsg));

      const userPassword: UserPassword = {
        email: 'testuser',
        password: 'testpassword',
        returnSecureToken: true,
      };

      authService.logIn(userPassword);

      const req = httpTestingController.expectOne(`${authService.url}/login`);
      expect(req.request.method).toBe('POST');
      req.flush({ idToken: 'fakeToken', localId: 'fakeLocalId' });

      expect(localStorage.getItem('token')).toEqual('fakeToken');
      expect(localStorage.getItem('id')).toEqual('fakeLocalId');
      expect(error).toBeNull();
    });

    it('should handle invalid login credentials error during login', () => {
      const userPassword: UserPassword = {
        email: 'invaliduser',
        password: 'invalidpassword',
        returnSecureToken: true,
      };

      const errorResponse = {
        detail: 'INVALID_LOGIN_CREDENTIALS',
      };

      let error: string | null = null;
      authService.error.subscribe((errorMsg) => (error = errorMsg));

      authService.logIn(userPassword);

      const req = httpTestingController.expectOne(`${authService.url}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });

      expect(error).toEqual(INVALID_LOGIN_CREDENTIALS);
    });

    it('should handle unknown error during login', () => {
      const userPassword: UserPassword = {
        email: 'testuser',
        password: 'testpassword',
        returnSecureToken: true,
      };

      const errorResponse = {
        detail: 'BAD_REQUEST',
      };

      let error: string | null = null;
      authService.error.subscribe((errorMsg) => (error = errorMsg));

      authService.logIn(userPassword);

      const req = httpTestingController.expectOne(`${authService.url}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });

      expect(error).toEqual(UNKNOWN_ERROR);
    });
  });
});

@Component({
  selector: 'app-dumb-component',
  template: '<div></div>',
  styleUrls: [],
})
class DumbComponent {}
