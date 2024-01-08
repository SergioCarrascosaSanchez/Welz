import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
})
export class TransactionPageComponent {
  transactions: Transaction[];
  currentTransactions: Transaction[];
  emptyTransactionsMessage = emptyTransactions;
  firstDisplayed: number = 0;
  lastDisplayed: number = 20;
  increment: number = 20;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.transactions = this.dataService.getTransactions();
    this.currentTransactions = this.transactions.slice(
      this.firstDisplayed,
      this.lastDisplayed
    );
    this.dataService.dataChange.subscribe(() => {
      this.transactions = this.dataService.getTransactions();
      this.currentTransactions = this.transactions.slice(
        this.firstDisplayed,
        this.lastDisplayed
      );
    });
  }

  next() {
    this.firstDisplayed = this.firstDisplayed + this.increment;
    this.lastDisplayed = this.lastDisplayed + this.increment;
    this.currentTransactions = this.transactions.slice(
      this.firstDisplayed,
      this.lastDisplayed
    );
  }
  back() {
    this.firstDisplayed = this.firstDisplayed - this.increment;
    this.lastDisplayed = this.lastDisplayed - this.increment;
    this.currentTransactions = this.transactions.slice(
      this.firstDisplayed,
      this.lastDisplayed
    );
  }
}

export const emptyTransactions = 'No hay ninguna transacción.';
