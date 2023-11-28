import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent, EmptyMessage, Title } from './accounts.component';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionsCollapsableComponent } from '../transactions-collapsable/transactions-collapsable.component';
import { Account } from 'src/app/interfaces/account.model';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { ModalComponent } from '../modal/modal.component';
import { AccountFormComponent } from '../account-form/account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Observable } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountsComponent,
        CardComponent,
        BadgeComponent,
        TransactionComponent,
        TransactionsCollapsableComponent,
        MoneyFormatPipe,
        ModalComponent,
        AccountFormComponent,
        IconButtonComponent,
        OptionsMenuComponent,
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: DataService, useClass: EmptyDataServiceMock }],
    });
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render empty message if there is no accounts', () => {
    component.accounts = [];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain(Title);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyMessage
    );
  });

  it('should render list of accounts message if there is one', () => {
    component.accounts = [account1];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain(Title);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      account1.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account1.balance)
    );
  });

  it('should render list of accounts message if there is more than one', () => {
    component.accounts = [account1, account2, account3];

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(Title);

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      account1.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account1.balance)
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      account2.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account2.balance)
    );

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      account3.name
    );
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      new MoneyFormatPipe().transform(account3.balance)
    );
  });
});

const account1: Account = {
  name: 'TestAccount 1',
  balance: 120,
};

const account2: Account = {
  name: 'TestAccount 2',
  balance: 28347.23,
};

const account3: Account = {
  name: 'TestAccount 3',
  balance: 0.34,
};

class EmptyDataServiceMock {
  error = new Observable<string>();
  dataChange = new EventEmitter<void>();
  getTransactionsOfAccount(s: string) {
    return [];
  }
  getTransactionsOfBudgetCategoryByDate(s: string) {
    return [];
  }
  getAccountById(id: number) {
    return account1;
  }
}
