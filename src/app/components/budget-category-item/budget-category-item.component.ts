import { Component, Input } from '@angular/core';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { Transaction } from 'src/app/interfaces/transaction.model';

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

  ngOnInit() {
    this.transactions = this.getTransactions();
  }
  onClick() {
    this.open = !this.open;
  }

  getTransactions() {
    return [];
    return [
      {
        description: 'Compra de supermercado',
        budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
        account: 'Cuenta principal',
        value: 250.25,
        date: new Date('2023-10-06'),
      },
      {
        description: 'Cena en McDonnalds',
        budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
        account: 'Cuenta principal',
        value: 12,
        date: new Date('2023-10-05'),
      },
      {
        description: 'Ceverzas con amigos',
        budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
        account: 'Cuenta principal',
        value: 2.5,
        date: new Date('2023-10-05'),
      },
    ];
  }
}

export const emptyTransactions = 'No hay transacciones.';
