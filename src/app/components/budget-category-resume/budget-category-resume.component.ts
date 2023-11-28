import { Component, Input } from '@angular/core';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { BudgetDateService } from 'src/app/services/budget-date/budget-date.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-budget-category-resume',
  templateUrl: './budget-category-resume.component.html',
  styleUrls: ['./budget-category-resume.component.css'],
})
export class BudgetCategoryResumeComponent {
  @Input() title: string;
  @Input() categories: BudgetCategory[];
  maxQuantity: number;
  currentQuantity: number;
  date: Date;

  constructor(
    private dataService: DataService,
    private budgetDateService: BudgetDateService
  ) {}

  ngOnInit() {
    this.date = this.budgetDateService.getDate();
    this.maxQuantity = this.calculateMaxQuantity();
    this.currentQuantity = this.calculateCurrentQuantity();

    this.budgetDateService.dateChange.subscribe(() => {
      this.date = this.budgetDateService.getDate();
      this.maxQuantity = this.calculateMaxQuantity();
      this.currentQuantity = this.calculateCurrentQuantity();
    });

    this.dataService.dataChange.subscribe(() => {
      this.maxQuantity = this.calculateMaxQuantity();
      this.currentQuantity = this.calculateCurrentQuantity();
    });
  }

  calculateMaxQuantity() {
    let max: number = 0;
    this.categories.forEach((category) => {
      max = max + category.max;
    });
    return max;
  }

  calculateCurrentQuantity() {
    let currentQuantity = 0;
    this.categories.forEach((category) => {
      this.dataService
        .getTransactionsOfBudgetCategoryByDate(category.id, this.date)
        .forEach((transaction) => {
          currentQuantity = currentQuantity + transaction.value;
        });
    });
    return currentQuantity;
  }
}
