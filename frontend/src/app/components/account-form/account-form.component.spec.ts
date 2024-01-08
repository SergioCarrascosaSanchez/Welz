import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AccountFormComponent,
  Title,
  EmptyError,
  MinAndEmptyError,
  DuplicatedAccountName,
  CorrectAdditionMessage,
  MinError,
  EditTitle,
} from './account-form.component';
import { AlertComponent, ALERT_TYPES } from '../alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { Account } from 'src/app/interfaces/account.model';
import { Observable } from 'rxjs';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountFormComponent, AlertComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: DataService, useClass: DataServiceMock }],
    });
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs, title and button', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain(Title);
    expect(
      fixture.debugElement.query(By.css('input[formControlName="description"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="balance"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should render inputs, title and button - editMode', () => {
    component.edit = true;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(EditTitle);
    expect(
      fixture.debugElement.query(By.css('input[formControlName="description"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="balance"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should render error message if all inputs are empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if description is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.accountForm.controls.balance.setValue(3);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if balance is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.accountForm.controls.description.setValue('test description');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should not render error message if no category is empty and render success message', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    component.accountForm.controls.description.setValue('test description');
    component.accountForm.controls.balance.setValue(108.3);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeTrue();
    expect(component.errors).toBeFalsy();

    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeFalsy();
  });

  it('should not render error message if balance is 0 and render success message', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    component.accountForm.controls.description.setValue('test description');
    component.accountForm.controls.balance.setValue(0);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeTrue();
    expect(component.errors).toBeFalsy();

    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeFalsy();
  });

  it('should render error message if quantity is less than 0', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.accountForm.controls.description.setValue('Test');
    component.accountForm.controls.balance.setValue(-1);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(MinError);
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if quantity is less than 0', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.accountForm.controls.description.setValue('Test');
    component.accountForm.controls.balance.setValue(-1);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(MinError);
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if quantity is less than 0 and there is a empty field', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.accountForm.controls.balance.setValue(-0.01);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      MinAndEmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if name is duplicated', () => {
    component.accountForm.controls.description.setValue(account.name);
    component.accountForm.controls.balance.setValue(1);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      DuplicatedAccountName
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });
});

/* DataServiceMocks */

class DataServiceMock {
  error = new Observable<string>();

  addNewAccount(account: Account) {}

  checkAccountName(name: string) {
    return name !== account.name;
  }

  checkAccountNameEdit(name1: string, name2: string) {
    return name2 !== account.name;
  }
}

const account: Account = {
  name: 'Mock1',
  balance: 1000,
};
