import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {
  AuthFormComponent,
  NotSignedUpText,
  SignedUpTitle,
} from 'src/app/components/auth-form/auth-form.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { Observable } from 'rxjs';
import { UserPassword } from 'src/app/interfaces/user-password';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { By } from '@angular/platform-browser';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent, AuthFormComponent, CardComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useClass: EmptyAuthServiceMock }],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs, and button - login', () => {
    expect(
      fixture.debugElement.query(By.css('input[formControlName="email"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="password"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="password2"]'))
    ).toBeFalsy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('u'))).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      NotSignedUpText
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      SignedUpTitle
    );
  });
});

class EmptyAuthServiceMock {
  error = new Observable<string>();
  signUp(userPassword: UserPassword) {
    return;
  }

  logIn(userPassword: UserPassword) {
    return;
  }
}
