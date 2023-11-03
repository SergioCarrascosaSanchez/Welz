import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-controller',
  templateUrl: './date-controller.component.html',
  styleUrls: ['./date-controller.component.css'],
})
export class DateControllerComponent {
  @Input() date = new Date();
}
