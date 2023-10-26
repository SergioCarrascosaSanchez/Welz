import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent, emptyTransactions } from './account.component';
import { DebugElement, EventEmitter } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { TransactionComponent } from '../transaction/transaction.component';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let debugElement: DebugElement;

  const account: Account = {
    name: 'TestAccount',
    balance: 120,
  };

  it('should create', () => {
    configureTestBed('');
    expect(component).toBeTruthy();
  });

  it('should render account name and value', () => {
    configureTestBed('');

    expect(debugElement.nativeElement.textContent).toContain(account.name);
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account.balance)
    );
  });

  it('should open and close list of transactions', () => {
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

  it('should open and close message if there is no transactions', () => {
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

  const configureTestBed = (mockService: string) => {
    if (mockService === '') {
      TestBed.configureTestingModule({
        declarations: [
          AccountComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
      });
    } else if (mockService === 'data') {
      TestBed.configureTestingModule({
        declarations: [
          AccountComponent,
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
          AccountComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
        providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      });
    }

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.account = account;
    fixture.detectChanges();
  };
});

/* DataServiceMocks */

class DataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfAccount(s: string) {
    return [transaction1, transaction2];
  }
}

class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfAccount(s: string) {
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
