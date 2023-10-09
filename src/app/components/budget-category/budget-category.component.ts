import { Component, Input } from '@angular/core';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';

@Component({
  selector: 'app-budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.css'],
})
export class BudgetCategoryComponent {
  @Input() title: string;
  @Input() categories: BudgetCategory[];
}
