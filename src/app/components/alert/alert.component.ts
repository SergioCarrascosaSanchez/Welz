import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string;
  @Input() type: ALERT_TYPES;
}

export enum ALERT_TYPES {
  danger = 'danger',
  success = 'success',
}
