import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TransactionFormComponent,
  Title,
  EmptyError,
  MinAndEmptyError,
  MinError,
  CorrectAdditionMessage,
  ButtonText,
  EditButtonText,
} from './transaction-form.component';
import { AlertComponent } from '../alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { Account } from 'src/app/interfaces/account.model';
import { DataService } from 'src/app/services/data/data.service';
import { ALERT_TYPES } from '../alert/alert.component';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EditText } from '../options-menu/options-menu.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFormComponent, AlertComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: DataService, useClass: DataServiceMock }],
    });
    fixture = TestBed.createComponent(TransactionFormComponent);
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
      fixture.debugElement.query(By.css('input[formControlName="quantity"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('select[formControlName="category"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('select[formControlName="account"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      ButtonText
    );
  });

  it('should render inputs, title and button - edit', () => {
    component.edit = true;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(EditText);
    expect(
      fixture.debugElement.query(By.css('input[formControlName="description"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="quantity"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('select[formControlName="category"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('select[formControlName="account"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EditButtonText
    );
  });

  it('should display correct value of select inputs', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      budgetCategory1.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      budgetCategory2.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      account1.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      account2.name
    );
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

    component.transactionForm.controls.quantity.setValue(3);
    component.transactionForm.controls.account.setValue(account1);
    component.transactionForm.controls.category.setValue(budgetCategory1);

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

  it('should render error message if quantity is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.transactionForm.controls.description.setValue('Test');
    component.transactionForm.controls.account.setValue(account1);
    component.transactionForm.controls.category.setValue(budgetCategory1);

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

  it('should render error message if account is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.transactionForm.controls.description.setValue('Test');
    component.transactionForm.controls.quantity.setValue(3);
    component.transactionForm.controls.category.setValue(budgetCategory1);

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

  it('should render error message if category is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.transactionForm.controls.description.setValue('Test');
    component.transactionForm.controls.quantity.setValue(3);
    component.transactionForm.controls.account.setValue(account1);

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

    component.transactionForm.controls.description.setValue('Test');
    component.transactionForm.controls.quantity.setValue(3);
    component.transactionForm.controls.category.setValue(budgetCategory1);
    component.transactionForm.controls.account.setValue(account1);

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

  it('should render error message if quantity is 0', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.transactionForm.controls.description.setValue('Test');
    component.transactionForm.controls.quantity.setValue(0);
    component.transactionForm.controls.category.setValue(budgetCategory1);
    component.transactionForm.controls.account.setValue(account1);

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

    component.transactionForm.controls.description.setValue('Test');
    component.transactionForm.controls.quantity.setValue(-1);
    component.transactionForm.controls.category.setValue(budgetCategory1);
    component.transactionForm.controls.account.setValue(account1);

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

  it('should render error message if quantity is 0 or less and there is a empty field', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.transactionForm.controls.quantity.setValue(0);
    component.transactionForm.controls.category.setValue(budgetCategory1);
    component.transactionForm.controls.account.setValue(account1);

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
});

/* DataServiceMocks */

class DataServiceMock {
  dataChange = new EventEmitter<void>();
  error = new Observable<string>();
  getBudgetCategories() {
    return [budgetCategory1, budgetCategory2];
  }
  getAccounts() {
    return [account1, account2];
  }

  addNewTransaction(t: Transaction) {}
}

const budgetCategory1: BudgetCategory = {
  name: 'Mock1',
  max: 1000,
  color: 'red',
};
const budgetCategory2: BudgetCategory = {
  name: 'Mock2',
  max: 1300,
  color: 'blue',
};
const account1: Account = { name: 'Account1', balance: 1 };
const account2: Account = { name: 'Account2', balance: 2 };
