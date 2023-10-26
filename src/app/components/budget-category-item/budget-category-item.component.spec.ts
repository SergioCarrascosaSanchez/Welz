import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BudgetCategoryItemComponent,
  emptyTransactions,
} from './budget-category-item.component';
import { DebugElement, EventEmitter } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { By } from '@angular/platform-browser';
import { TransactionComponent } from '../transaction/transaction.component';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';

describe('BudgetCategoryItemComponent', () => {
  let component: BudgetCategoryItemComponent;
  let fixture: ComponentFixture<BudgetCategoryItemComponent>;
  let debugElement: DebugElement;

  it('should create', () => {
    configureTestBed('');
    expect(component).toBeTruthy();
  });

  it('should render category badge and value', () => {
    configureTestBed('');
    const name = 'TestingBudgetCategoryItem';
    const value = 112340;
    const color = 'red';

    const budgetCategory = { name: name, max: value, color: color };

    component.category = budgetCategory;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(
      budgetCategory.name
    );
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(budgetCategory.max)
    );
    expect(debugElement.nativeElement.textContent).toContain(
      budgetCategory.name
    );
    expect(fixture.debugElement.query(By.css('.badge'))).toBeTruthy();
  });

  it('should open and close list of transactions on click', () => {
    configureTestBed('data');

    component.category = budgetCategory;

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
          BudgetCategoryItemComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
      });
    } else if (mockService === 'data') {
      TestBed.configureTestingModule({
        declarations: [
          BudgetCategoryItemComponent,
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
          BudgetCategoryItemComponent,
          CardComponent,
          BadgeComponent,
          MoneyFormatPipe,
          TransactionComponent,
        ],
        providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      });
    }

    fixture = TestBed.createComponent(BudgetCategoryItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.category = {
      name: '',
      max: 0,
      color: '',
    };
    fixture.detectChanges();
  };
});

/* DataServiceMocks */

class DataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfBudgetCategory(s: string) {
    return [transaction1, transaction2];
  }
}

class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfBudgetCategory(s: string) {
    return [];
  }
}
const name = 'TestingBudgetCategoryItem';
const value = 128376;
const color = 'red';

const transaction1: Transaction = {
  description: 'Mock Transaction 1',
  budgetCategory: { name: 'Mock1', max: 1000, color: 'red' },
  account: { name: 'Cuenta principal', balance: 0 },
  value: 50.25,
  date: new Date('2023-10-06'),
};
const transaction2: Transaction = {
  description: 'Mock Transaction 2',
  budgetCategory: { name: 'Mock2', max: 2000, color: 'blue' },
  account: { name: 'Cuenta principal', balance: 0 },
  value: 120.0,
  date: new Date('2023-10-05'),
};

const budgetCategory = { name: name, max: value, color: color };
