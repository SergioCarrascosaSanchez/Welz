import { Component, Input } from '@angular/core';
import { Budget } from 'src/app/interfaces/budget.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent {
  budget: Budget;
  sinceDate = new Date();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.budget = this.dataService.getBudget();
    this.dataService.dataChange.subscribe(() => {
      this.budget = this.dataService.getBudget();
    });
  }

  dateChange(newDate: Date) {
    this.sinceDate = newDate;
  }
}
