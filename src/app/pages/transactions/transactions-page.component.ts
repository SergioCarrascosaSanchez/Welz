import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.model';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
})
export class TransactionPageComponent {
  @Input() transactions: Transaction[] = [
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
      account: 'Cuenta principal',
      budgetCategory: {
        name: 'Entretenimiento',
        max: 1000,
        color: 'green',
      },
      value: 120.0,
      date: new Date('2023-10-05'),
    },
    {
      description: 'Compra de gasolina',
      budgetCategory: { name: 'Transporte', max: 500, color: 'orange' },
      account: 'Cuenta principal',
      value: 40.0,
      date: new Date('2023-10-04'),
    },
    {
      description: 'Pago de factura de teléfono',
      budgetCategory: { name: 'Comunicaciones', max: 500, color: 'purple' },
      account: 'Cuenta principal',
      value: 60.0,
      date: new Date('2023-10-03'),
    },
    {
      description: 'Cena en un restaurante',
      budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
      account: 'Cuenta principal',
      value: 75.5,
      date: new Date('2023-10-02'),
    },
    {
      description: 'Compra de boletos de cine',
      budgetCategory: { name: 'Entretenimiento', max: 200, color: 'green' },
      account: 'Cuenta principal',
      value: 30.0,
      date: new Date('2023-10-01'),
    },
  ];
  emptyTransactionsMessage = emptyTransactions;
}

export const emptyTransactions = 'No hay ninguna transacción.';
