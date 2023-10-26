import { Component, Input } from '@angular/core';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-budget-category-item',
  templateUrl: './budget-category-item.component.html',
  styleUrls: ['./budget-category-item.component.css'],
})
export class BudgetCategoryItemComponent {
  @Input() category: BudgetCategory;
  open = false;
  transactions: Transaction[];
  emptyTransactionsMessage = emptyTransactions;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.transactions = this.getTransactions();
    this.dataService.dataChange.subscribe(() => {
      this.transactions = this.getTransactions();
    });
  }
  onClick() {
    this.open = !this.open;
  }

  getTransactions() {
    return this.dataService.getTransactionsOfBudgetCategory(this.category.name);
  }
}

export const emptyTransactions = 'No hay transacciones.';
