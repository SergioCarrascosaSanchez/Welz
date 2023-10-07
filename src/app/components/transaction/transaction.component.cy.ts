import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { CardComponent } from '../card/card.component';
import { TransactionComponent } from './transaction.component';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { BadgeComponent } from '../badge/badge.component';

describe('Account', () => {
  it('should render accountName and balance', () => {
    const transaction: Transaction = {
      description: 'Compra de comestibles',
      budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
      account: 'Cuenta principal',
      value: 50.25,
      date: new Date('2023-10-06'),
    };
    cy.mount(TransactionComponent, {
      componentProperties: {
        transaction: transaction,
      },
      declarations: [
        TransactionComponent,
        CardComponent,
        BadgeComponent,
        MoneyFormatPipe,
      ],
    });
    cy.contains(transaction.description);
    cy.contains(transaction.budgetCategory.name);
    cy.contains(
      `${transaction.date.getDate()}/${
        transaction.date.getMonth() + 1
      }/${transaction.date.getFullYear()}`
    );
    cy.contains(new MoneyFormatPipe().transform(transaction.value));
  });
});
