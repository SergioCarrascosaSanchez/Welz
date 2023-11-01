import { Component, Input } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transactions-collapsable',
  templateUrl: './transactions-collapsable.component.html',
  styleUrls: ['./transactions-collapsable.component.css'],
})
export class TransactionsCollapsableComponent {
  @Input() data: Account | BudgetCategory;
  open = false;
  listOfTransactions: Transaction[];
  emptyTransactionsMessage = emptyTransactions;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.isAccount(this.data)) {
      this.listOfTransactions = this.dataService.getTransactionsOfAccount(
        this.data.name
      );
      this.dataService.dataChange.subscribe(() => {
        this.listOfTransactions = this.dataService.getTransactionsOfAccount(
          this.data.name
        );
      });
    }
    if (this.isBudgetCategory(this.data)) {
      this.listOfTransactions =
        this.dataService.getTransactionsOfBudgetCategory(this.data.name);
      this.dataService.dataChange.subscribe(() => {
        this.listOfTransactions =
          this.dataService.getTransactionsOfBudgetCategory(this.data.name);
      });
    }
  }

  onClick() {
    this.open = !this.open;
  }

  getTrasanctionType(): string {
    if (this.isAccount(this.data)) return 'regular';
    if (this.isBudgetCategory(this.data)) return 'budget';
    return null;
  }

  isAccount(data: Account | BudgetCategory): data is Account {
    return (data as Account).balance !== undefined;
  }

  isBudgetCategory(data: Account | BudgetCategory): data is BudgetCategory {
    return (data as BudgetCategory).color !== undefined;
  }
}

export const emptyTransactions = 'No hay transacciones.';
