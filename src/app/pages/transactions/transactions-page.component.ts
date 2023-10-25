import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
})
export class TransactionPageComponent {
  transactions: Transaction[];
  emptyTransactionsMessage = emptyTransactions;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.transactions = this.dataService.getTransactions();
    this.dataService.dataChange.subscribe(() => {
      this.transactions = this.dataService.getTransactions();
    });
  }
}

export const emptyTransactions = 'No hay ninguna transacción.';
