import { CardComponent } from '../card/card.component';
import { AccountComponent } from './account.component';

describe('Account', () => {
  it('should render accountName and balance', () => {
    cy.mount(
      `<app-account [name]="'accoutName'" [balance]="10000"></app-account>`,
      {
        declarations: [AccountComponent, CardComponent],
      }
    );
    cy.contains('accoutName');
    cy.contains(':');
    cy.contains(10000);
  });
});
