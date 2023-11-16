import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserPassword } from 'src/app/interfaces/user-password';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
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
