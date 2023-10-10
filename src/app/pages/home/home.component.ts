import { Component } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string;
  balance: number;
  accounts: Account[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.username = this.dataService.getUsername();
    this.balance = this.dataService.getBalance();
    this.accounts = this.dataService.getAccounts();
  }
}
