import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import {
  TransactionPageComponent,
  emptyTransactions,
} from './transactions-page.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { BadgeComponent } from 'src/app/components/badge/badge.component';
import { Transaction } from 'src/app/interfaces/transaction.model';

describe('TransactionPage', () => {
  it('should render one transaction', () => {
    const transaction: Transaction = {
      description: 'Compra de comestibles',
      budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
      account: 'Cuenta principal',
      value: 50.25,
      date: new Date('2023-10-06'),
    };

    cy.mount(TransactionPageComponent, {
      componentProperties: {
        transactions: [transaction],
      },
      declarations: [
        TransactionComponent,
        CardComponent,
        MoneyFormatPipe,
        BadgeComponent,
      ],
    });

    cy.contains(emptyTransactions).should('not.exist');

    cy.contains(transaction.description);
    cy.contains(transaction.budgetCategory.name);
    cy.contains(
      `${transaction.date.getDate()}/${
        transaction.date.getMonth() + 1
      }/${transaction.date.getFullYear()}`
    );
    cy.contains(new MoneyFormatPipe().transform(transaction.value));
  });

  it('should render list of transactions', () => {
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

    cy.mount(TransactionPageComponent, {
      componentProperties: {
        transactions: [transaction1, transaction2],
      },
      declarations: [
        TransactionComponent,
        CardComponent,
        MoneyFormatPipe,
        BadgeComponent,
      ],
    });

    cy.contains(emptyTransactions).should('not.exist');

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

  it('should render message if there are not transactions', () => {
    cy.mount(TransactionPageComponent, {
      componentProperties: {
        transactions: [],
      },
      declarations: [],
    });
    cy.contains(emptyTransactions);
  });
});
