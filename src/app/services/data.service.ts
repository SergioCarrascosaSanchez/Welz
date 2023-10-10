import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/userData.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: UserData = {
    username: 'Sergio',
    balance: 15149.2,
    budget: {
      incomeCategories: [{ name: 'Nomina', max: 1500, color: 'green' }],
      savingCategories: [
        { name: 'Casa', max: 500, color: 'green' },
        { name: 'Vacaciones', max: 100, color: 'green' },
      ],
      expensesCategories: [
        { name: 'Alimentacion', max: 100, color: 'red' },
        { name: 'Ocio', max: 100, color: 'purple' },
        { name: 'Fijos', max: 400, color: 'grey' },
      ],
    },
    accounts: [
      {
        name: 'Cuenta santander ahorro',
        balance: 19999.12,
      },
      { name: 'Cuenta BBVA gastos', balance: 9040.23 },
      { name: 'Inversión', balance: 132000 },
    ],
    transactions: [
      {
        description: 'Compra de comestibles',
        budgetCategory: { name: 'Alimentacion', max: 1000, color: 'red' },
        account: 'Cuenta santander ahorro',
        value: 50.25,
        date: new Date('2023-10-06'),
      },
      {
        description: 'Pago de factura de electricidad',
        budgetCategory: { name: 'Fijos', max: 1000, color: 'grey' },
        account: 'Cuenta santander ahorro',
        value: 120.0,
        date: new Date('2023-10-05'),
      },
      {
        description: 'Cine',
        account: 'Cuenta BBVA gastos',
        budgetCategory: {
          name: 'Ocio',
          max: 1000,
          color: 'purple',
        },
        value: 120.0,
        date: new Date('2023-10-05'),
      },
      {
        description: 'Compra de gasolina',
        budgetCategory: { name: 'Fijos', max: 500, color: 'grey' },
        account: 'Cuenta santander ahorro',
        value: 40.0,
        date: new Date('2023-10-04'),
      },
      {
        description: 'Pago de factura de teléfono',
        budgetCategory: { name: 'Fijos', max: 500, color: 'grey' },
        account: 'Cuenta santander ahorro',
        value: 60.0,
        date: new Date('2023-10-03'),
      },
      {
        description: 'Cena en un restaurante',
        budgetCategory: { name: 'Ocio', max: 1000, color: 'purple' },
        account: 'Cuenta BBVA gastos',
        value: 75.5,
        date: new Date('2023-10-02'),
      },
      {
        description: 'Bolera',
        budgetCategory: { name: 'Ocio', max: 200, color: 'purple' },
        account: 'Cuenta santander ahorro',
        value: 30.0,
        date: new Date('2023-10-01'),
      },
    ],
  };
  loading = false;

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;

    this.loading = false;
  }

  getUsername() {
    return this.data.username;
  }

  getBalance() {
    return this.data.balance;
  }

  getTransactions() {
    return this.data.transactions;
  }

  getAccounts() {
    return this.data.accounts;
  }

  getBudget() {
    return this.data.budget;
  }

  getTransactionsOfAccount(account: string) {
    const transactions = this.data.transactions.filter(
      (transaction) => transaction.account === account
    );
    return transactions;
  }

  getTransactionsOfBudgetCategory(budgetCategory: string) {
    const transactions = this.data.transactions.filter(
      (transaction) => transaction.budgetCategory.name === budgetCategory
    );
    return transactions;
  }
}
