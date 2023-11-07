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
import { DataService } from 'src/app/services/data.service';
import { Transaction } from 'src/app/interfaces/transaction.model';

describe('TransactionsCollapsableComponent', () => {
  let component: TransactionsCollapsableComponent;
  let fixture: ComponentFixture<TransactionsCollapsableComponent>;
  let debugElement: DebugElement;

  const account: Account = {
    name: 'TestAccount',
    balance: 120,
  };

  it('should create', () => {
    configureTestBed('');
    expect(component).toBeTruthy();
  });

  it('should render account name and value - account mode', () => {
    configureTestBed('');

    expect(debugElement.nativeElement.textContent).toContain(account.name);
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account.balance)
    );
  });

  it('should change chevron on open and close - account mode', () => {
    configureTestBed('');

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
    configureTestBed('data');

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
    configureTestBed('empty');

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

  it('should render category badge and value - budget mode', () => {
    configureTestBed('empty');
    const name = 'TestingBudgetCategoryItem';
    const value = 112340;
    const color = 'red';

    const budgetCategory = { name: name, max: value, color: color };

    component.data = budgetCategory;
    fixture.detectChanges();

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
    configureTestBed('data');

    component.data = budgetCategory;

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

  it('should open and close message if there is no transactions - budget mode', () => {
    configureTestBed('empty');

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
    configureTestBed('');

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
    if (mockService === '') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
      });
    } else if (mockService === 'data') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
        providers: [{ provide: DataService, useClass: DataServiceMock }],
      });
    } else if (mockService === 'empty') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionsCollapsableComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
        providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      });
    }

    fixture = TestBed.createComponent(TransactionsCollapsableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.data = account;
    fixture.detectChanges();
  };
});

/* DataServiceMocks */

class DataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfAccount(s: string) {
    return [transaction1, transaction2];
  }
  getTransactionsOfBudgetCategory(s: string) {
    return [transaction1, transaction2];
  }
}

class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfAccount(s: string) {
    return [];
  }
  getTransactionsOfBudgetCategory(s: string) {
    return [];
  }
}

const transaction1: Transaction = {
  description: 'Mock Account Transaction 1',
  budgetCategory: { name: 'Mock1', max: 1000, color: 'red' },
  account: { name: 'Cuenta principal', balance: 0 },
  value: 50.25,
  date: new Date('2023-10-06'),
};
const transaction2: Transaction = {
  description: 'Mock Account Transaction 2',
  budgetCategory: { name: 'Mock2', max: 2000, color: 'blue' },
  account: { name: 'Cuenta principal', balance: 0 },
  value: 120.0,
  date: new Date('2023-10-05'),
};

const name = 'TestingBudgetCategoryItem';
const value = 128376;
const color = 'red';

const budgetCategory = { name: name, max: value, color: color };
