import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { BudgetCategoryComponent } from './budget-category.component';
import { BadgeComponent } from '../badge/badge.component';

describe('BudgetItemComponent', () => {
  it('should render title', () => {
    const title = 'Test title';
    cy.mount(BudgetCategoryComponent, {
      componentProperties: {
        title: title,
      },
    });
    cy.contains(title);
  });

  it('should render title and one budgetCategory', () => {
    const name = 'Alimentacion';
    const value = 1000;
    const color = 'red';

    const title = 'Test title';

    const budgetCategory = { name: name, max: value, color: color };

    cy.mount(BudgetCategoryComponent, {
      componentProperties: {
        title: title,
        categories: [budgetCategory],
      },
      declarations: [MoneyFormatPipe, BadgeComponent],
    });

    cy.contains(title);

    cy.contains(name);
    cy.contains(new MoneyFormatPipe().transform(value));
    cy.contains(name).should('have.class', 'badge');
  });

  it('should render title and list of budgetCategories', () => {
    const title = 'Test title';

    const name1 = 'Alimentacion';
    const value1 = 1000;
    const color1 = 'red';

    const name2 = 'Ocio';
    const value2 = 50;
    const color2 = 'blue';

    const budgetCategory1 = { name: name1, max: value1, color: color1 };
    const budgetCategory2 = { name: name2, max: value2, color: color2 };

    cy.mount(BudgetCategoryComponent, {
      componentProperties: {
        title: title,
        categories: [budgetCategory1, budgetCategory2],
      },
      declarations: [MoneyFormatPipe, BadgeComponent],
    });

    cy.contains(title);

    cy.contains(name1);
    cy.contains(new MoneyFormatPipe().transform(value1));
    cy.contains(name1).should('have.class', 'badge');

    cy.contains(name2);
    cy.contains(new MoneyFormatPipe().transform(value2));
    cy.contains(name2).should('have.class', 'badge');
  });
});
