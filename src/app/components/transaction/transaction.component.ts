import { Component } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  @Input() transaction: Transaction;
  @Input() type: string = 'regular';

  displayMenu = false;

  onHover() {
    this.displayMenu = true;
  }

  onLeave() {
    this.displayMenu = false;
  }
}
