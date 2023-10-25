import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TransactionPageComponent,
  emptyTransactions,
} from './transactions-page.component';
import { DebugElement } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { BadgeComponent } from 'src/app/components/badge/badge.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';

describe('Transactionns Page Component', () => {
  let component: TransactionPageComponent;
  let fixture: ComponentFixture<TransactionPageComponent>;
  let debugElement: DebugElement;

  it('should create', () => {
    configureTestBed('empty');
    expect(component).toBeTruthy();
  });

  it('should render message if there is no transactions', () => {
    configureTestBed('empty');
    expect(debugElement.nativeElement.textContent).toContain(emptyTransactions);

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      transaction1.description
    );

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      transaction2.description
    );
  });

  it('should render list of transactions', () => {
    configureTestBed('data');

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction1.budgetCategory.name
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
      transaction2.budgetCategory.name
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
  });

  const configureTestBed = (mockType: string) => {
    if (mockType === 'empty') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionPageComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
        providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      });
    } else if (mockType === 'data') {
      TestBed.configureTestingModule({
        declarations: [
          TransactionPageComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
        providers: [{ provide: DataService, useClass: DataServiceMock }],
      });
    }

    fixture = TestBed.createComponent(TransactionPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.transactions = [];
    fixture.detectChanges();
  };
});

/* DataServiceMocks */
@Injectable({
  providedIn: 'root',
})
class DataServiceMock {
  getTransactions() {
    return [transaction1, transaction2];
  }
}

@Injectable({
  providedIn: 'root',
})
class EmptyDataServiceMock {
  getTransactions() {
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
