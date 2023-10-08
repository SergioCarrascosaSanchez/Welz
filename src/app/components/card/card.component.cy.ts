import { CardComponent } from './card.component';

describe('CardComponent', () => {
  it('normal card should render content', () => {
    const content = 'Test Content';
    cy.mount(`<app-card>${content}</app-card>`, {
      declarations: [CardComponent],
    });
    cy.contains(content);
  });

  it('normal card should have card class', () => {
    const content = 'Test Content';
    cy.mount(`<app-card>${content}</app-card>`, {
      declarations: [CardComponent],
    });
    cy.get('[role="region"]').should('have.class', 'card');
    cy.get('[role="region"]').should('not.have.class', 'subcard');
  });

  it('subcard card should render content', () => {
    const content = 'Test Content';
    cy.mount(`<app-card type="subcard">${content}</app-card>`, {
      declarations: [CardComponent],
    });
    cy.contains(content);
  });

  it('subcard card should have subcard class', () => {
    const content = 'Test Content';
    cy.mount(`<app-card type="subcard">${content}</app-card>`, {
      declarations: [CardComponent],
    });
    cy.get('[role="region"]').should('have.class', 'subcard');
    cy.get('[role="region"]').should('not.have.class', 'card');
  });
});
