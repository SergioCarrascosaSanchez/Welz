import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent {
  @Input() text: string;
  @Input() color: string;

  setColor() {
    return { 'background-color': this.color };
  }
}
