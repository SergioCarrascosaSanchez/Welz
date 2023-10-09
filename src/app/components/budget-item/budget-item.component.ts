import { Component, Input } from '@angular/core';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.css'],
})
export class BudgetItemComponent {
  @Input() title: string;
  @Input() categories: BudgetCategory[];
}
