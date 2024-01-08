import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TransactionsCollapsableComponent,
  emptyTransactions,
} from './transactions-collapsable.component';
import { DebugElement, EventEmitter } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { DataService } from 'src/app/services/data/data.service';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { Observable } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ModalComponent } from '../modal/modal.component';
import { AccountFormComponent } from '../account-form/account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetCategoryFormComponent } from '../budget-category-form/budget-category-form.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

describe('TransactionsCollapsableComponent', () => {
  let component: TransactionsCollapsableComponent;
  let fixture: ComponentFixture<TransactionsCollapsableComponent>;
  let debugElement: DebugElement;

  it('should create - account mode', () => {
    configureTestBed('empty-account-mode');
    expect(component).toBeTruthy();
  });

  it('should render account name and value - account mode', () => {
    configureTestBed('empty-account-mode');

    expect(debugElement.nativeElement.textContent).toContain(account.name);
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account.balance)
    );
  });

  it('should change chevron on open and close - account mode', () => {
    configureTestBed('empty-account-mode');

    expect(fixture.debugElement.query(By.css('#chevron-down'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#chevron-up'))).toBeFalsy();

    component.open = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#chevron-down'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#chevron-up'))).toBeTruthy();

    component.open = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#chevron-down'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#chevron-up'))).toBeFalsy();
  });

  it('should open and close list of transactions - account mode', () => {
    configureTestBed('data-account-mode');

    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction1.description
    );
    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction2.description
    );

    component.open = true;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction1.description
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(transaction1.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${transaction1.date.getDate()}/${
        transaction1.date.getMonth() + 1
      }/${transaction1.date.getFullYear()}`
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction2.description
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(transaction2.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${transaction2.date.getDate()}/${
        transaction2.date.getMonth() + 1
      }/${transaction2.date.getFullYear()}`
    );

    component.open = false;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction1.description
    );
    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction2.description
    );
  });

  it('should open and close message if there is no transactions - account mode', () => {
    configureTestBed('empty-account-mode');

    expect(debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    component.open = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(emptyTransactions);

    component.open = false;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );
  });

  it('should create - budget mode', () => {
    configureTestBed('empty-budget-mode');
    expect(component).toBeTruthy();
  });

  it('should render category badge and value - budget mode', () => {
    configureTestBed('empty-budget-mode');
    expect(debugElement.nativeElement.textContent).toContain(
      budgetCategory.name
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(0) +
        '  / ' +
        new MoneyFormatPipe().transform(
          Math.floor(budgetCategory.max * 100) / 100
        )
    );

    expect(fixture.debugElement.query(By.css('.badge'))).toBeTruthy();
  });

  it('should open and close list of transactions on click - budget mode', () => {
    configureTestBed('data-budget-mode');

    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction1.description
    );
    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction2.description
    );

    component.open = true;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction1.description
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(transaction1.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${transaction1.date.getDate()}/${
        transaction1.date.getMonth() + 1
      }/${transaction1.date.getFullYear()}`
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction2.description
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(transaction2.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${transaction2.date.getDate()}/${
        transaction2.date.getMonth() + 1
      }/${transaction2.date.getFullYear()}`
    );

    component.open = false;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction1.description
    );
    expect(debugElement.nativeElement.textContent).not.toContain(
      transaction2.description
    );
  });

  it('should open and close message if there is no transactions - budget mode', () => {
    configureTestBed('empty-budget-mode');

    expect(debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    component.open = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(emptyTransactions);

    component.open = false;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );
  });

  it('should change chevron on open and close - budget mode', () => {
    configureTestBed('empty-budget-mode');

    expect(fixture.debugElement.query(By.css('#chevron-down'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#chevron-up'))).toBeFalsy();

    component.open = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#chevron-down'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#chevron-up'))).toBeTruthy();

    component.open = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#chevron-down'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#chevron-up'))).toBeFalsy();
  });

  const configureTestBed = (mockService: string) => {
    if (mockService === 'data-account-mode') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
          IconButtonComponent,
          ModalComponent,
          AccountFormComponent,
          BudgetCategoryFormComponent,
          ColorPickerComponent,
          OptionsMenuComponent,
          TransactionFormComponent,
        ],
        imports: [ReactiveFormsModule],
        providers: [{ provide: DataService, useClass: DataServiceMock }],
      });
      fixture = TestBed.createComponent(TransactionsCollapsableComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.data = account;
    } else if (mockService === 'data-budget-mode') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
          IconButtonComponent,
          ModalComponent,
          AccountFormComponent,
          BudgetCategoryFormComponent,
          ColorPickerComponent,
          OptionsMenuComponent,
          TransactionFormComponent,
        ],
        imports: [ReactiveFormsModule],
        providers: [{ provide: DataService, useClass: DataServiceMock }],
      });
      fixture = TestBed.createComponent(TransactionsCollapsableComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.data = budgetCategory;
    } else if (mockService === 'empty-account-mode') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
          IconButtonComponent,
          ModalComponent,
          AccountFormComponent,
          BudgetCategoryFormComponent,
          ColorPickerComponent,
          OptionsMenuComponent,
          TransactionFormComponent,
        ],
        imports: [ReactiveFormsModule],
        providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      });
      fixture = TestBed.createComponent(TransactionsCollapsableComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.data = account;
    } else if (mockService === 'empty-budget-mode') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
          IconButtonComponent,
          ModalComponent,
          AccountFormComponent,
          BudgetCategoryFormComponent,
          ColorPickerComponent,
          OptionsMenuComponent,
          TransactionFormComponent,
        ],
        imports: [ReactiveFormsModule],
        providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      });
      fixture = TestBed.createComponent(TransactionsCollapsableComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.data = budgetCategory;
    }

    fixture.detectChanges();
  };
});

/* DataServiceMocks */

class DataServiceMock {
  dataChange = new EventEmitter<void>();
  error = new Observable<string>();
  getTransactionsOfAccount(s: string) {
    return [transaction1, transaction2];
  }
  getTransactionsOfBudgetCategoryByDate(s: string) {
    return [transaction1, transaction2];
  }

  getAccountById(id: number) {
    return account;
  }

  getCategoryTypeByName(name: string) {
    return 'expensesCategory';
  }

  getBudgetCategories() {
    return [budgetCategory];
  }

  getAccounts() {
    return [];
  }

  getCategoryType() {
    return 'expensesCategories';
  }

  getCategoryById() {
    return budgetCategory;
  }
}

class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  error = new Observable<string>();
  getTransactionsOfAccount(s: string) {
    return [];
  }
  getTransactionsOfBudgetCategoryByDate(s: string) {
    return [];
  }

  getAccountById(id: number) {
    return account;
  }

  getCategoryTypeByName(name: string) {
    return 'expensesCategory';
  }

  getBudgetCategories() {
    return [];
  }

  getAccounts() {
    return [account];
  }
}

const transaction1: Transaction = {
  description: 'Mock Account Transaction 1',
  budgetCategory: 10,
  account: 0,
  value: 50.25,
  date: new Date('2023-10-06'),
};
const transaction2: Transaction = {
  description: 'Mock Account Transaction 2',
  budgetCategory: 10,
  account: 0,
  value: 120.0,
  date: new Date('2023-10-05'),
};

const name = 'TestingBudgetCategoryItem';
const value = 128376;
const color = 'red';

const budgetCategory = { id: 10, name: name, max: value, color: color };

const account: Account = {
  name: 'TestAccount',
  balance: 120,
};
