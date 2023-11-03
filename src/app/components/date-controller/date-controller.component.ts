import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-controller',
  templateUrl: './date-controller.component.html',
  styleUrls: ['./date-controller.component.css'],
})
export class DateControllerComponent {
  date = new Date();
  @Output() dateChange = new EventEmitter<Date>();

  onChangeMonth(changeValue: number) {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + changeValue,
      this.date.getDate()
    );
    this.dateChange.emit(this.date);
  }
}
