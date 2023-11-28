import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BudgetCategoryComponent,
  EmptyMessage,
} from './budget-category.component';
import { DebugElement, EventEmitter } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { TransactionComponent } from '../transaction/transaction.component';
import { DataService } from 'src/app/services/data/data.service';
import { ModalComponent } from '../modal/modal.component';
import { BudgetCategoryFormComponent } from '../budget-category-form/budget-category-form.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionsCollapsableComponent } from '../transactions-collapsable/transactions-collapsable.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { Observable } from 'rxjs';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';

describe('BudgetCategoryComponent', () => {
  let component: BudgetCategoryComponent;
  let fixture: ComponentFixture<BudgetCategoryComponent>;
  let debugElement: DebugElement;

  it('should create', () => {
    configureTestBed();
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    configureTestBed();
    const title = 'TitleTest';
    component.title = title;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(title);
  });

  it('should render list of categories', () => {
    configureTestBed();
    const budgetCategory1 = {
      name: 'TestingBudgetCategory1',
      max: 128376,
      color: 'red',
    };
    const budgetCategory2 = {
      name: 'TestingBudgetCategory2',
      max: 9012376,
      color: 'blue',
    };
    const budgetCategory3 = {
      name: 'TestingBudgetCategory3',
      max: 12376.223,
      color: 'green',
    };

    component.categories = [budgetCategory1, budgetCategory2, budgetCategory3];

    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).not.toContain(EmptyMessage);

    expect(debugElement.nativeElement.textContent).toContain(
      budgetCategory1.name
    );
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(budgetCategory1.max)
    );

    expect(debugElement.nativeElement.textContent).toContain(
      budgetCategory2.name
    );
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(budgetCategory2.max)
    );

    expect(debugElement.nativeElement.textContent).toContain(
      budgetCategory3.name
    );
    expect(debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(budgetCategory3.max)
    );
  });

  it('should render empty message if there is no transactions', () => {
    configureTestBed();
    const title = 'TitleTest';
    component.title = title;
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(EmptyMessage);
  });

  const configureTestBed = () => {
    TestBed.configureTestingModule({
      declarations: [
        BudgetCategoryComponent,
        TransactionsCollapsableComponent,
        CardComponent,
        BadgeComponent,
        MoneyFormatPipe,
        TransactionComponent,
        ModalComponent,
        BudgetCategoryFormComponent,
        ColorPickerComponent,
        IconButtonComponent,
        OptionsMenuComponent,
      ],
      providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(BudgetCategoryComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.categories = [];

    fixture.detectChanges();
  };
});

/* DataServiceMocks */

class EmptyDataServiceMock {
  dataChange = new EventEmitter<void>();
  error = new Observable<string>();
  getTransactionsOfBudgetCategory(s: string) {
    return [];
  }

  getTransactionsOfBudgetCategoryByDate(s: string) {
    return [];
  }

  getCategoryTypeByName(name: string) {
    return '';
  }
}
