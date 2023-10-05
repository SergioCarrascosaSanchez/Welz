import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { CardComponent } from '../card/card.component';
import { AccountComponent } from './account.component';

describe('Account', () => {
  it('should render accountName and balance', () => {
    const accountName = 'Test account';
    const accountBalance = 10000;

    cy.mount(AccountComponent, {
      componentProperties: {
        name: accountName,
        balance: accountBalance,
      },
      declarations: [CardComponent, MoneyFormatPipe],
    });
    cy.contains(accountName);
    cy.contains(new MoneyFormatPipe().transform(accountBalance));
  });
});
