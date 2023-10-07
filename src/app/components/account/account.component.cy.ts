import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { CardComponent } from '../card/card.component';
import { AccountComponent, emptyTransactions } from './account.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { BadgeComponent } from '../badge/badge.component';
import { Transaction } from 'src/app/interfaces/transaction.model';

describe('Account', () => {
  it('should render accountName and balance', () => {
    const accountName: string = 'Test account';
    const accountBalance: number = 10000;
    cy.mount(AccountComponent, {
      componentProperties: {
        account: {
          name: accountName,
          balance: accountBalance,
          transactions: [],
        },
      },
      declarations: [CardComponent, MoneyFormatPipe],
    });
    cy.contains(accountName);
    cy.contains(new MoneyFormatPipe().transform(accountBalance));
  });

  it('should open transaction list when clicked ', () => {
    const accountName: string = 'Test account';
    const accountBalance: number = 10000;
    const transaction1: Transaction = {
      description: 'Compra de comestibles',
      budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
      account: 'Cuenta principal',
      value: 50.25,
      date: new Date('2023-10-06'),
    };
    const transaction2: Transaction = {
      description: 'Pago de factura de electricidad',
      budgetCategory: { name: 'Servicios', max: 1000, color: 'blue' },
      account: 'Cuenta principal',
      value: 120.0,
      date: new Date('2023-10-05'),
    };

    cy.mount(AccountComponent, {
      componentProperties: {
        account: {
          name: accountName,
          balance: accountBalance,
          transactions: [transaction1, transaction2],
        },
      },
      declarations: [
        CardComponent,
        MoneyFormatPipe,
        TransactionComponent,
        BadgeComponent,
      ],
    });
    cy.contains(accountName);
    cy.contains(new MoneyFormatPipe().transform(accountBalance));

    cy.contains(accountName).click();

    cy.contains(transaction1.description);
    cy.contains(transaction1.budgetCategory.name);
    cy.contains(
      `${transaction1.date.getDate()}/${
        transaction1.date.getMonth() + 1
      }/${transaction1.date.getFullYear()}`
    );
    cy.contains(new MoneyFormatPipe().transform(transaction1.value));

    cy.contains(transaction2.description);
    cy.contains(transaction2.budgetCategory.name);
    cy.contains(
      `${transaction2.date.getDate()}/${
        transaction2.date.getMonth() + 1
      }/${transaction2.date.getFullYear()}`
    );
    cy.contains(new MoneyFormatPipe().transform(transaction2.value));
  });

  it('should close transaction list when clicked ', () => {
    const accountName: string = 'Test account';
    const accountBalance: number = 10000;
    const transaction1: Transaction = {
      description: 'Compra de comestibles',
      budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
      account: 'Cuenta principal',
      value: 50.25,
      date: new Date('2023-10-06'),
    };

    cy.mount(AccountComponent, {
      componentProperties: {
        account: {
          name: accountName,
          balance: accountBalance,
          transactions: [transaction1],
        },
      },
      declarations: [
        CardComponent,
        MoneyFormatPipe,
        TransactionComponent,
        BadgeComponent,
      ],
    });
    cy.contains(accountName);
    cy.contains(new MoneyFormatPipe().transform(accountBalance));

    cy.contains(accountName).click();

    cy.contains(transaction1.description);

    cy.contains(accountName).click();

    cy.contains(transaction1.description).should('not.exist');
    cy.contains(transaction1.budgetCategory.name).should('not.exist');
    cy.contains(
      `${transaction1.date.getDate()}/${
        transaction1.date.getMonth() + 1
      }/${transaction1.date.getFullYear()}`
    ).should('not.exist');
    cy.contains(new MoneyFormatPipe().transform(transaction1.value)).should(
      'not.exist'
    );

    cy.contains(accountName);
    cy.contains(new MoneyFormatPipe().transform(accountBalance));
  });

  it('should render a message when empty transaction list is opened ', () => {
    const accountName: string = 'Test account';
    const accountBalance: number = 10000;
    cy.mount(AccountComponent, {
      componentProperties: {
        account: {
          name: accountName,
          balance: accountBalance,
          transactions: [],
        },
      },
      declarations: [
        CardComponent,
        MoneyFormatPipe,
        TransactionComponent,
        BadgeComponent,
      ],
    });
    cy.contains(accountName);
    cy.contains(new MoneyFormatPipe().transform(accountBalance));
    cy.contains(accountName).click();
    cy.contains(emptyTransactions);
  });
});
