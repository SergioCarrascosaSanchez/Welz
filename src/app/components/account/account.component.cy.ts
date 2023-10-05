import { MoneyFormatPipe } from 'src/app/pipes/money-format.pipe';
import { CardComponent } from '../card/card.component';
import { AccountComponent } from './account.component';

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
});
