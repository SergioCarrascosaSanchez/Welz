import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-budget-resume',
  templateUrl: './simple-budget-resume.component.html',
  styleUrls: ['./simple-budget-resume.component.css'],
})
export class SimpleBudgetResumeComponent {
  @Input() title: string;
  @Input() current: number;
  @Input() max: number;
}
