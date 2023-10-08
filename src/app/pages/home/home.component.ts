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
      transactions: [
        {
          description: 'Compra de comestibles',
          budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
          account: 'Cuenta principal',
          value: 50.25,
          date: new Date('2023-10-06'),
        },
        {
          description: 'Pago de factura de electricidad',
          budgetCategory: { name: 'Servicios', max: 1000, color: 'blue' },
          account: 'Cuenta principal',
          value: 120.0,
          date: new Date('2023-10-05'),
        },
        {
          description: 'Comida rápida',
          budgetCategory: {
            name: 'Entretenimiento',
            max: 1000,
            color: 'green',
          },
          account: 'Tarjeta de crédito',
          value: 15.75,
          date: new Date('2023-10-04'),
        },
      ],
    },
    { name: 'Cuenta BBVA gastos', balance: 9040.23, transactions: [] },
    { name: 'Inversión', balance: 132000, transactions: [] },
  ];
}
