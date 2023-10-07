import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
})
export class TransactionPageComponent {
  @Input() transactions: Transaction[];
  emptyTransactionsMessage = emptyTransactions;
}

export const emptyTransactions = 'No hay ninguna transacción.';
