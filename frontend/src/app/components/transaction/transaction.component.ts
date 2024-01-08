import { Component, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  @Input() transaction: Transaction;
  @Input() type: string = 'regular';

  category: BudgetCategory;

  displayMenu = false;
  editModalOpen: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.category = this.dataService.getCategoryById(
      this.transaction.budgetCategory,
      this.dataService.getCategoryType(this.transaction.budgetCategory)
    );

    this.dataService.dataChange.subscribe(() => {
      this.category = this.dataService.getCategoryById(
        this.transaction.budgetCategory,
        this.dataService.getCategoryType(this.transaction.budgetCategory)
      );
    });
  }

  onDelete() {
    this.dataService.deleteTransaction(this.transaction);
  }

  onEdit() {
    this.editModalOpen = true;
  }

  onClose() {
    this.editModalOpen = false;
  }
}
