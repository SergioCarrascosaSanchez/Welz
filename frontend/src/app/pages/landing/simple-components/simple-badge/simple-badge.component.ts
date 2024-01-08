import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-badge',
  templateUrl: './simple-badge.component.html',
  styleUrls: ['./simple-badge.component.css'],
})
export class SimpleBadgeComponent {
  @Input() text: string;
  @Input() color: string;
  @Input() marginR: string;
  @Input() marginL: string;
}
