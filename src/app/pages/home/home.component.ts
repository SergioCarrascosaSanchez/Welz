import { Component } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username = 'Sergio';
  balance = 15300.23;
  accounts: Account[] = [
    {
      name: 'Cuenta santander ahorro',
      balance: 19999.12,
    },
    { name: 'Cuenta BBVA gastos', balance: 9040.23 },
    { name: 'Inversión', balance: 132000 },
  ];
}
