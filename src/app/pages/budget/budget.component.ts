import { Component, Input } from '@angular/core';
import { Budget } from 'src/app/interfaces/budget.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent {
  budget: Budget;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.budget = this.dataService.getBudget();
    this.dataService.dataChange.subscribe(() => {
      this.budget = this.dataService.getBudget();
    });
  }
}
