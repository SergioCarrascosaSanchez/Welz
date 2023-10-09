import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import {
  BudgetCategoryItemComponent,
  emptyTransactions,
} from './budget-category-item.component';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { BadgeComponent } from '../badge/badge.component';

describe('BudgetItemComponent', () => {
  it('should render category badge and value', () => {
    const name = 'Alimentacion';
    const value = 1000;
    const color = 'red';

    const budgetCategory = { name: name, max: value, color: color };

    cy.mount(BudgetCategoryItemComponent, {
      componentProperties: {
        category: budgetCategory,
      },
      declarations: [MoneyFormatPipe, BadgeComponent],
    });
    cy.contains(name);
    cy.contains(new MoneyFormatPipe().transform(value));
    cy.contains(name).should('have.class', 'badge');
  });

  it('should open and close list of transactions on click', () => {
    const name = 'Alimentacion';
    const value = 1000;
    const color = 'red';

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

    const budgetCategory = { name: name, max: value, color: color };

    cy.mount(BudgetCategoryItemComponent, {
      componentProperties: {
        category: budgetCategory,
      },
      declarations: [MoneyFormatPipe, BadgeComponent],
    }).then((wrapper) => {
      wrapper.component.transactions = [transaction1, transaction2];
      return cy.wrap(wrapper).as('angular');
    });

    cy.contains(transaction1.description).should('not.exist');
    cy.contains(transaction2.description).should('not.exist');

    cy.contains(name).click();

    cy.contains(emptyTransactions).should('not.exist');

    cy.contains(transaction1.description);
    cy.contains(
      `${transaction1.date.getDate()}/${
        transaction1.date.getMonth() + 1
      }/${transaction1.date.getFullYear()}`
    );
    cy.contains(new MoneyFormatPipe().transform(transaction1.value));

    cy.contains(transaction2.description);
    cy.contains(
      `${transaction2.date.getDate()}/${
        transaction2.date.getMonth() + 1
      }/${transaction2.date.getFullYear()}`
    );
    cy.contains(new MoneyFormatPipe().transform(transaction2.value));

    cy.contains(name).click();

    cy.contains(transaction1.description).should('not.exist');
    cy.contains(transaction2.description).should('not.exist');
  });

  it('should open and close message if there is no transactions', () => {
    const name = 'Alimentacion';
    const value = 1000;
    const color = 'red';

    const budgetCategory = { name: name, max: value, color: color };

    cy.mount(BudgetCategoryItemComponent, {
      componentProperties: {
        category: budgetCategory,
      },
      declarations: [MoneyFormatPipe, BadgeComponent],
    }).then((wrapper) => {
      wrapper.component.transactions = [];
      return cy.wrap(wrapper).as('angular');
    });

    cy.contains(emptyTransactions).should('not.exist');
    cy.contains(name).click();
    cy.contains(emptyTransactions);
    cy.contains(name).click();
    cy.contains(emptyTransactions).should('not.exist');
  });
});
