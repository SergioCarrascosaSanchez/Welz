import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, ALERT_TYPES } from '../alert/alert.component';
import {
  AUTH_FORM_TYPES,
  AuthFormComponent,
  EmailError,
  EmptyError,
  MinError,
  NotSignedUpText,
  NotSignedUpTitle,
  PasswordsError,
  SignedUpText,
  SignedUpTitle,
} from './auth-form.component';
import { UserPassword } from 'src/app/interfaces/user-password';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent, AlertComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useClass: EmptyAuthServiceMock }],
    });
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs, and button - login', () => {
    component.type = AUTH_FORM_TYPES.LOGIN;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('input[formControlName="email"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="password"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="password2"]'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="username"]'))
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

  it('should render inputs, and button - signup', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('input[formControlName="email"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="password"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="password2"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="username"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('u'))).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      SignedUpText
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      NotSignedUpTitle
    );
  });

  it('should change between forms on click text', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('u')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.type).toEqual(AUTH_FORM_TYPES.LOGIN);

    fixture.debugElement.query(By.css('u')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.type).toEqual(AUTH_FORM_TYPES.SIGNUP);
  });

  it('should render error all empty fields - signup', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
  });

  it('should render error all empty fields - login', () => {
    component.type = AUTH_FORM_TYPES.LOGIN;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
  });

  it('should render error on one field', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.authForm.controls['email'].setValue('test@test.com');
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    component.type = AUTH_FORM_TYPES.LOGIN;

    const button2 = fixture.nativeElement.querySelector('button');
    expect(button2).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
  });

  it('should render error if email sintax is not correct', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;

    component.authForm.controls['email'].setValue('testtest.com');
    component.authForm.controls['password'].setValue('121212121212');
    component.authForm.controls['password2'].setValue('121212121212');

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmailError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    component.type = AUTH_FORM_TYPES.LOGIN;

    const button2 = fixture.nativeElement.querySelector('button');
    expect(button2).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmailError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
  });

  it('should render error if passwords length is below 8', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;

    component.authForm.controls['email'].setValue('test@test.com');
    component.authForm.controls['password'].setValue('1212');
    component.authForm.controls['password2'].setValue('121212121212');

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(MinError);
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    component.type = AUTH_FORM_TYPES.LOGIN;

    const button2 = fixture.nativeElement.querySelector('button');
    expect(button2).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(MinError);
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
  });

  it('should render error if the passwords are not the same', () => {
    component.type = AUTH_FORM_TYPES.SIGNUP;

    component.authForm.controls['email'].setValue('test@test.com');
    component.authForm.controls['password'].setValue('121212121213');
    component.authForm.controls['password2'].setValue('121212121212');

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      PasswordsError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
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

//https://firebase.google.com/docs/reference/rest/auth?hl=es-419#section-create-email-password
