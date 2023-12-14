import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TransactionPageComponent,
  emptyTransactions,
} from './transactions-page.component';
import { DebugElement, EventEmitter } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { BadgeComponent } from 'src/app/components/badge/badge.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { DataService } from 'src/app/services/data/data.service';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { OptionsMenuComponent } from 'src/app/components/options-menu/options-menu.component';
import { IconButtonComponent } from 'src/app/components/icon-button/icon-button.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TransactionFormComponent } from 'src/app/components/transaction-form/transaction-form.component';
import { Account } from 'src/app/interfaces/account.model';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

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
      category1.name
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
      category2.name
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
  it('should render only a number of transactions and change when click', () => {
    configureTestBed('data');
    component.lastDisplayed = 1;
    component.increment = 0;
    component.next();
    component.back();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      category1.name
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

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      category2.name
    );

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      transaction2.description
    );
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      new MoneyFormatPipe().transform(transaction2.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      `${transaction2.date.getDate()}/${
        transaction2.date.getMonth() + 1
      }/${transaction2.date.getFullYear()}`
    );

    component.firstDisplayed = 1;
    component.lastDisplayed = 2;
    component.next();
    component.back();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      emptyTransactions
    );

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      category1.name
    );

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      transaction1.description
    );

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      new MoneyFormatPipe().transform(transaction1.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      `${transaction1.date.getDate()}/${
        transaction1.date.getMonth() + 1
      }/${transaction1.date.getFullYear()}`
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      category2.name
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
          IconButtonComponent,
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
          OptionsMenuComponent,
          IconButtonComponent,
          ModalComponent,
          TransactionFormComponent,
        ],
        imports: [ReactiveFormsModule],
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
  dataChange = new EventEmitter<void>();
  error = new Observable<string>();
  getTransactions() {
    return [transaction1, transaction2];
  }
  getBudgetCategories() {
    return [category1, category2];
  }
  getAccounts() {
    return [account];
  }

  getCategoryById(id: number) {
    if (id === category1.id) {
      return category1;
    }
    if (id === category2.id) {
      return category2;
    }
    return null;
  }

  getCategoryType() {
    return 'expensesCategories';
  }
}

@Injectable({
  providedIn: 'root',
})
class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  error = new Observable<string>();
  getTransactions() {
    return [];
  }
  getBudgetCategories() {
    return [];
  }
  getAccounts() {
    return [];
  }

  getCategoryType() {}
}

const category1 = { id: 10, name: 'Mock1', max: 1000, color: 'red' };
const category2 = { id: 11, name: 'Mock2', max: 2000, color: 'blue' };

const transaction1: Transaction = {
  description: 'Mock Account Transaction 1',
  budgetCategory: 10,
  account: 0,
  value: 50.25,
  date: new Date('2023-10-06'),
};
const transaction2: Transaction = {
  description: 'Mock Account Transaction 2',
  budgetCategory: 11,
  account: 0,
  value: 120.0,
  date: new Date('2023-10-05'),
};

const account: Account = {
  id: 0,
  name: 'Test account',
  balance: 500,
};
