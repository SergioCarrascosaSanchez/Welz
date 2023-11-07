import { EventEmitter, Injectable } from '@angular/core';
import { UserData } from '../interfaces/userData.model';
import { Transaction } from '../interfaces/transaction.model';
import { BudgetCategory } from '../interfaces/budgetCategory.model';
import { Account } from '../interfaces/account.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataChange = new EventEmitter<void>();

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
        account: { name: 'Cuenta santander ahorro', balance: 19999.12 },
        value: 50.25,
        date: new Date('2023-10-06'),
      },
      {
        description: 'Pago de factura de electricidad',
        budgetCategory: { name: 'Fijos', max: 1000, color: 'grey' },
        account: { name: 'Cuenta santander ahorro', balance: 19999.12 },
        value: 120.0,
        date: new Date('2023-10-05'),
      },
      {
        description: 'Cine',
        account: { name: 'Cuenta BBVA gastos', balance: 9040.23 },
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
        account: { name: 'Cuenta santander ahorro', balance: 19999.12 },
        value: 40.0,
        date: new Date('2023-10-04'),
      },
      {
        description: 'Pago de factura de teléfono',
        budgetCategory: { name: 'Fijos', max: 500, color: 'grey' },
        account: { name: 'Cuenta santander ahorro', balance: 19999.12 },
        value: 60.0,
        date: new Date('2023-10-03'),
      },
      {
        description: 'Cena en un restaurante',
        budgetCategory: { name: 'Ocio', max: 1000, color: 'purple' },
        account: { name: 'Cuenta BBVA gastos', balance: 9040.23 },
        value: 75.5,
        date: new Date('2023-10-02'),
      },
      {
        description: 'Bolera',
        budgetCategory: { name: 'Ocio', max: 200, color: 'purple' },
        account: { name: 'Cuenta santander ahorro', balance: 19999.12 },
        value: 30.0,
        date: new Date('2023-10-01'),
      },
    ],
  };

  /*  private data: UserData = {
    username: 'Sergio',
    balance: 15149.2,
    budget: {
      incomeCategories: [],
      savingCategories: [],
      expensesCategories: [],
    },
    accounts: [],
    transactions: [],
  };*/
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
    let balance = 0;
    this.data.accounts.forEach((account) => {
      balance = balance + account.balance;
    });
    return balance;
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
      (transaction) => transaction.account.name === account
    );
    return transactions;
  }

  getTransactionsOfBudgetCategory(budgetCategory: string) {
    const transactions = this.data.transactions.filter(
      (transaction) => transaction.budgetCategory.name === budgetCategory
    );
    return transactions;
  }

  getTransactionsOfBudgetCategoryByDate(budgetCategory: string, date: Date) {
    const transactions = this.data.transactions.filter((transaction) => {
      return (
        transaction.budgetCategory.name === budgetCategory &&
        date.getFullYear() === transaction.date.getFullYear() &&
        date.getMonth() === transaction.date.getMonth()
      );
    });
    return transactions;
  }

  getBudgetCategories() {
    return [
      ...this.data.budget.expensesCategories,
      ...this.data.budget.incomeCategories,
      ...this.data.budget.savingCategories,
    ];
  }

  addNewTransaction(transaction: Transaction) {
    this.data.transactions.unshift(transaction);
    const account: Account = this.data.accounts.find(
      (account) => account.name === transaction.account.name
    );
    if (
      this.data.budget.expensesCategories.includes(transaction.budgetCategory)
    ) {
      account.balance = account.balance - transaction.value;
    } else if (
      this.data.budget.incomeCategories.includes(transaction.budgetCategory)
    ) {
      account.balance = account.balance + transaction.value;
    }
    this.dataChange.emit();
  }

  addNewCategory(budgetCategory: BudgetCategory, type: string) {
    this.data.budget[type].push(budgetCategory);
    this.dataChange.emit();
  }

  checkCategoryName(name: string) {
    const categoryNames = [];
    this.data.budget.expensesCategories.forEach((el) => {
      categoryNames.push(el.name);
    });
    this.data.budget.incomeCategories.forEach((el) => {
      categoryNames.push(el.name);
    });
    this.data.budget.savingCategories.forEach((el) => {
      categoryNames.push(el.name);
    });

    return !categoryNames.includes(name);
  }

  addNewAccount(account: Account) {
    this.data.accounts.push(account);
    this.dataChange.emit();
  }

  checkAccountName(name: string) {
    const accountNames = [];
    this.data.accounts.forEach((el) => {
      accountNames.push(el.name);
    });
    return !accountNames.includes(name);
  }
}
