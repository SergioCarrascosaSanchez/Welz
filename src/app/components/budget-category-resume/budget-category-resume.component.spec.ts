import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoryResumeComponent } from './budget-category-resume.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { DataService } from 'src/app/services/data/data.service';
import { BudgetDateService } from 'src/app/services/budget-date/budget-date.service';
import { DebugElement, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';

describe('BudgetCategoryResumeComponent', () => {
  let component: BudgetCategoryResumeComponent;
  let fixture: ComponentFixture<BudgetCategoryResumeComponent>;
  let debugElement: DebugElement;

  it('should create', () => {
    configureTestBed('empty');
    expect(component).toBeTruthy();
  });

  it('should render title + 0/0 if there is no categories and transactions', () => {
    configureTestBed('empty');
    expect(fixture.debugElement.nativeElement.textContent).toContain(title);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(0) +
        '  / ' +
        new MoneyFormatPipe().transform(0)
    );
  });

  it('should render title + 0/max if there is categories but no transactions', () => {
    configureTestBed('no-transactions');
    expect(fixture.debugElement.nativeElement.textContent).toContain(title);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(0) +
        '  / ' +
        new MoneyFormatPipe().transform(
          Math.floor((budgetCategory1.max + budgetCategory2.max) * 100) / 100
        )
    );
  });

  it('should render title + current / max if there is categories and transactions', () => {
    configureTestBed('data');
    expect(fixture.debugElement.nativeElement.textContent).toContain(title);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(
        Math.floor((transaction1.value + transaction2.value) * 100) / 100
      ) +
        '  / ' +
        new MoneyFormatPipe().transform(
          Math.floor((budgetCategory1.max + budgetCategory2.max) * 100) / 100
        )
    );
  });

  const configureTestBed = (mockService: string) => {
    if (mockService === 'empty') {
      TestBed.configureTestingModule({
        declarations: [BudgetCategoryResumeComponent, MoneyFormatPipe],
        providers: [
          { provide: DataService, useClass: EmptyDataServiceMock },
          { provide: BudgetDateService, useClass: BudgetDateServiceMock },
        ],
      });
      fixture = TestBed.createComponent(BudgetCategoryResumeComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;

      component.categories = [];
      component.title = title;
    } else if (mockService === 'no-transactions') {
      TestBed.configureTestingModule({
        declarations: [BudgetCategoryResumeComponent, MoneyFormatPipe],
        providers: [
          { provide: DataService, useClass: EmptyDataServiceMock },
          { provide: BudgetDateService, useClass: BudgetDateServiceMock },
        ],
      });
      fixture = TestBed.createComponent(BudgetCategoryResumeComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;

      component.categories = [budgetCategory1, budgetCategory2];
      component.title = title;
    } else if (mockService === 'data') {
      TestBed.configureTestingModule({
        declarations: [BudgetCategoryResumeComponent, MoneyFormatPipe],
        providers: [
          { provide: DataService, useClass: DataServiceMock },
          { provide: BudgetDateService, useClass: BudgetDateServiceMock },
        ],
      });
      fixture = TestBed.createComponent(BudgetCategoryResumeComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;

      component.categories = [budgetCategory1, budgetCategory2];
      component.title = title;
    }
    fixture.detectChanges();
  };
});

const title = 'MockTitle';

/* BudgetDateServiceMock */
class BudgetDateServiceMock {
  dateChange = new EventEmitter<void>();
  getDate() {
    return new Date();
  }
}

/* DataServiceMocks */

class DataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfBudgetCategoryByDate(s: number) {
    if (s === budgetCategory1.id) {
      return [transaction1];
    } else if (s === budgetCategory2.id) {
      return [transaction2];
    }
    return [];
  }
}

class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  getTransactionsOfBudgetCategoryByDate(s: string) {
    return [];
  }
}

const name1 = 'TestingBudgetCategoryItem';
const max1 = 128376;
const color1 = 'red';

const name2 = 'TestingBudgetCategoryItem 2';
const max2 = 286.23;
const color2 = 'red';

const budgetCategory1 = { id: 10, name: name1, max: max1, color: color1 };
const budgetCategory2 = { id: 11, name: name2, max: max2, color: color2 };

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
