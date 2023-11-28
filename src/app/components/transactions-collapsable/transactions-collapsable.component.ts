import { Component, Input, SimpleChanges } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { BudgetDateService } from 'src/app/services/budget-date/budget-date.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-transactions-collapsable',
  templateUrl: './transactions-collapsable.component.html',
  styleUrls: ['./transactions-collapsable.component.css'],
})
export class TransactionsCollapsableComponent {
  @Input() data: Account | BudgetCategory;

  constructor(
    private dataService: DataService,
    private budgetDateService: BudgetDateService
  ) {}

  sinceDate: Date;

  open = false;
  listOfTransactions: Transaction[];
  transactionQuantityTotal: number = 0;

  emptyTransactionsMessage = emptyTransactions;

  displayEditButton = false;
  displayEditMenu = false;

  onClose() {
    this.displayEditMenu = false;
  }

  onEdit() {
    this.displayEditMenu = true;
  }

  onDelete() {
    if (this.isAccount(this.data)) {
      this.dataService.deleteAccount(this.data.id);
    }
    if (this.isBudgetCategory(this.data)) {
      this.dataService.deleteCategory(this.data);
    }
  }

  onToggleOpen() {
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

  calculateTransactionQuantityTotal(): number {
    let currentQuantity = 0;
    this.listOfTransactions.forEach((transaction) => {
      currentQuantity = currentQuantity + transaction.value;
    });
    return currentQuantity;
  }

  ngOnInit() {
    this.sinceDate = this.budgetDateService.getDate();
    this.budgetDateService.dateChange.subscribe(() => {
      this.sinceDate = this.budgetDateService.getDate();
      this.listOfTransactions =
        this.dataService.getTransactionsOfBudgetCategoryByDate(
          this.data.id,
          this.sinceDate
        );
      this.transactionQuantityTotal = this.calculateTransactionQuantityTotal();
    });

    if (this.isAccount(this.data)) {
      this.listOfTransactions = this.dataService.getTransactionsOfAccount(
        this.data.id
      );
      this.dataService.dataChange.subscribe(() => {
        this.listOfTransactions = this.dataService.getTransactionsOfAccount(
          this.data.id
        );
      });
    }
    if (this.isBudgetCategory(this.data)) {
      this.listOfTransactions =
        this.dataService.getTransactionsOfBudgetCategoryByDate(
          this.data.id,
          this.sinceDate
        );
      this.transactionQuantityTotal = this.calculateTransactionQuantityTotal();
      this.dataService.dataChange.subscribe(() => {
        this.listOfTransactions =
          this.dataService.getTransactionsOfBudgetCategoryByDate(
            this.data.id,
            this.sinceDate
          );
        this.transactionQuantityTotal =
          this.calculateTransactionQuantityTotal();
      });
    }
  }
}

export const emptyTransactions = 'No hay transacciones.';
