import { Component, EventEmitter, Output } from '@angular/core';
import { BudgetDateService } from 'src/app/services/budget-date/budget-date.service';

@Component({
  selector: 'app-date-controller',
  templateUrl: './date-controller.component.html',
  styleUrls: ['./date-controller.component.css'],
})
export class DateControllerComponent {
  date: Date;

  constructor(private budgetDateService: BudgetDateService) {}

  ngOnInit() {
    this.date = this.budgetDateService.getDate();
    this.budgetDateService.dateChange.subscribe((newDate) => {
      this.date = newDate;
    });
  }

  onChangeMonth(changeValue: number) {
    this.budgetDateService.onChangeMonth(changeValue);
  }
}
