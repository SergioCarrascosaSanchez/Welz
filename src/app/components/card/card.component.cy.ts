import { CardComponent } from './card.component';

describe('CardComponent', () => {
  it('should render content', () => {
    const content = 'Test Content';
    cy.mount(`<app-card [count]="100">${content}</app-card>`, {
      declarations: [CardComponent],
    });
    cy.contains(content);
  });
});
