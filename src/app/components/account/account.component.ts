import { Component, Input } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: Account;
  emptyTransactionsMessage = emptyTransactions;
  open = false;

  onClick() {
    this.open = !this.open;
  }
}

export const emptyTransactions = 'No hay ninguna transacción.';
