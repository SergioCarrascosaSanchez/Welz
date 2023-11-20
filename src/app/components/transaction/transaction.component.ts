import { Component } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';
import { Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  @Input() transaction: Transaction;
  @Input() type: string = 'regular';

  displayMenu = false;

  constructor(private dataService: DataService) {}

  onDelete() {
    this.dataService.deleteTransaction(this.transaction);
  }
}
