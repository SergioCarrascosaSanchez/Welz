import { Component, Input } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: Account;
  transactions: Transaction[];
  emptyTransactionsMessage = emptyTransactions;
  open = false;

  onClick() {
    this.open = !this.open;
  }

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.transactions = this.dataService.getTransactionsOfAccount(
      this.account.name
    );
  }
}

export const emptyTransactions = 'No hay ninguna transacción.';
