import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { TransactionComponent } from './transaction.component';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { DataService } from 'src/app/services/data/data.service';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ModalComponent } from '../modal/modal.component';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  const transaction: Transaction = {
    description: 'TestingTransacition',
    budgetCategory: 10,
    account: 0,
    value: 50.25,
    date: new Date('2017-10-06'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionComponent,
        CardComponent,
        BadgeComponent,
        MoneyFormatPipe,
        OptionsMenuComponent,
        IconButtonComponent,
        ModalComponent,
        TransactionFormComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
    });
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;

    component.transaction = transaction;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render description, date,  category and value if type regular', () => {
    expect(component.type).toEqual('regular');

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction.description
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      category.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(transaction.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${transaction.date.getDate()}/${
        transaction.date.getMonth() + 1
      }/${transaction.date.getFullYear()}`
    );
  });

  it('should render description, date, and value if type budget', () => {
    component.type = 'budget';
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      transaction.description
    );
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      category.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(transaction.value)
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      `${transaction.date.getDate()}/${
        transaction.date.getMonth() + 1
      }/${transaction.date.getFullYear()}`
    );
  });
});

const category: BudgetCategory = {
  id: 10,
  name: 'TestingTransacitionCategory',
  max: 1000,
  color: 'red',
};

class EmptyDataServiceMock {
  error = new Observable<string>();
  dataChange = new EventEmitter<void>();
  getBudgetCategories() {
    return [];
  }
  getAccounts() {
    return [];
  }

  getCategoryById() {
    return category;
  }

  getCategoryType() {
    return 'expensesCategories';
  }
}
