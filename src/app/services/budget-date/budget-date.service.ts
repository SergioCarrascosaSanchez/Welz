import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetDateService {
  constructor() {}

  private date: Date = new Date();
  dateChange = new EventEmitter<Date>();

  onChangeMonth(changeValue: number) {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + changeValue,
      this.date.getDate()
    );
    this.dateChange.emit(this.date);
  }

  getDate() {
    return this.date;
  }
}
