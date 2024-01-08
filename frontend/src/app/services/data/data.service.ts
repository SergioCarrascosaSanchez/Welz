import { EventEmitter, Injectable } from '@angular/core';
import { UserData } from '../../interfaces/userData.model';
import { Transaction } from '../../interfaces/transaction.model';
import { BudgetCategory } from '../../interfaces/budgetCategory.model';
import { Account } from '../../interfaces/account.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataChange = new EventEmitter<void>();
  url = 'http://127.0.0.1:8000/';
  loadedData = new BehaviorSubject<boolean>(false);
  private data: UserData = undefined;

  private errorSubject = new BehaviorSubject<string | null>(null);
  error = this.errorSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get<UserData>(`${this.url}${localStorage.getItem('id')}`, {
        params: new HttpParams().set('auth', localStorage.getItem('token')),
      })
      .subscribe({
        next: (response) => {
          this.errorSubject.next(null);
          this.prepareData(response);
          this.data = this.prepareData(response);
          this.loadedData.next(true);
          this.dataChange.emit();
        },
        error: (error) => {
          if (error.status.toString() === '401') {
            this.router.navigate(['/auth']);
          }
          this.errorSubject.next(ERROR);
        },
      });
  }

  prepareData(newData: any): UserData {
    if (newData.budget === undefined) {
      newData.budget = {
        incomeCategories: [],
        savingCategories: [],
        expensesCategories: [],
      };
    }
    if (newData.budget.incomeCategories === undefined) {
      newData.budget.incomeCategories = [];
    }
    if (newData.budget.expensesCategories === undefined) {
      newData.budget.expensesCategories = [];
    }
    if (newData.budget.savingCategories === undefined) {
      newData.budget.savingCategories = [];
    }
    if (newData.accounts === undefined) {
      newData.accounts = [];
    }
    if (newData.transactions === undefined) {
      newData.transactions = [];
    } else {
      newData.transactions = newData.transactions.map((transaction) => {
        return {
          ...transaction,
          date: new Date(transaction.date),
        };
      });
    }
    if (newData.dailyBalance === undefined) {
      newData.dailyBalance = [];
    }
    return newData;
  }

  updateData() {
    this.http
      .put<UserData>(`${this.url}${localStorage.getItem('id')}`, this.data, {
        params: new HttpParams().set('auth', localStorage.getItem('token')),
      })
      .subscribe({
        next: (response) => {
          this.errorSubject.next(null);
          this.dataChange.emit();
        },
        error: (error) => {
          this.errorSubject.next(ERROR);
        },
      });
  }

  getData() {
    return this.data;
  }

  setData(data: UserData) {
    this.data = data;
  }

  getUsername() {
    return this.data !== undefined ? this.data.username : '';
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
  getAccountById(id: number) {
    const index = this.data.accounts.findIndex((accountInArray) => {
      return id === accountInArray.id;
    });
    return this.data.accounts[index];
  }

  getBudget() {
    return this.data.budget;
  }

  getCategoryById(id: number, type: string) {
    const index = this.data.budget[type].findIndex((categoryInArray) => {
      return id === categoryInArray.id;
    });
    return this.data.budget[type][index];
  }

  getCategoryTypeByName(name: string) {
    let index = this.data.budget.expensesCategories.findIndex(
      (categoryInArray) => {
        return name === categoryInArray.name;
      }
    );
    if (index !== -1) {
      return 'expensesCategories';
    }
    index = this.data.budget.incomeCategories.findIndex((categoryInArray) => {
      return name === categoryInArray.name;
    });
    if (index !== -1) {
      return 'incomeCategories';
    }
    index = this.data.budget.savingCategories.findIndex((categoryInArray) => {
      return name === categoryInArray.name;
    });
    if (index !== -1) {
      return 'savingCategories';
    }
    return null;
  }

  getTransactionById(id: number): Transaction {
    return this.data.transactions.filter(
      (transaction) => transaction.id === id
    )[0];
  }

  getTransactionsOfAccount(accountId: number) {
    const transactions = this.data.transactions.filter(
      (transaction) => transaction.account === accountId
    );
    return transactions;
  }

  getTransactionsOfBudgetCategory(budgetCategoryId: number) {
    const transactions = this.data.transactions.filter(
      (transaction) => transaction.budgetCategory === budgetCategoryId
    );
    return transactions;
  }

  getTransactionsOfBudgetCategoryByDate(budgetCategoryId: number, date: Date) {
    const transactions = this.data.transactions.filter((transaction) => {
      return (
        transaction.budgetCategory === budgetCategoryId &&
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
    if (this.data.transactions.length === 0) {
      transaction.id = 0;
    } else {
      transaction.id = this.data.transactions[0].id + 1;
    }
    this.data.transactions.unshift(transaction);
    const account: Account = this.data.accounts.find(
      (account) => account.id === transaction.account
    );

    if (
      this.getCategoryType(transaction.budgetCategory) === 'expensesCategories'
    ) {
      account.balance = account.balance - transaction.value;
    } else if (
      this.getCategoryType(transaction.budgetCategory) === 'incomeCategories'
    ) {
      account.balance = account.balance + transaction.value;
    }
    this.dailyBalanceAdd(transaction);
    this.updateData();
  }

  editTransaction(id: number, transactionToEdit: Transaction) {
    const oldTransaction = this.getTransactionById(id);

    const account: Account = this.data.accounts.find(
      (account) => account.id === oldTransaction.account
    );

    if (
      this.getCategoryType(oldTransaction.budgetCategory) ===
      'expensesCategories'
    ) {
      account.balance = account.balance + oldTransaction.value;
    } else if (
      this.getCategoryType(oldTransaction.budgetCategory) === 'incomeCategories'
    ) {
      account.balance = account.balance - oldTransaction.value;
    }

    const accountToEdit: Account = this.data.accounts.find(
      (account) => account.id === transactionToEdit.account
    );

    if (
      this.getCategoryType(transactionToEdit.budgetCategory) ===
      'expensesCategories'
    ) {
      accountToEdit.balance = accountToEdit.balance - transactionToEdit.value;
    } else if (
      this.getCategoryType(transactionToEdit.budgetCategory) ===
      'incomeCategories'
    ) {
      accountToEdit.balance = accountToEdit.balance + transactionToEdit.value;
    }

    this.dailyBalanceEdit(oldTransaction, transactionToEdit);

    oldTransaction.description = transactionToEdit.description;
    oldTransaction.value = transactionToEdit.value;
    oldTransaction.account = transactionToEdit.account;
    oldTransaction.budgetCategory = transactionToEdit.budgetCategory;

    this.updateData();
  }

  deleteTransaction(transactionToDelete: Transaction) {
    this.deleteTransactionWithOutUpdating(transactionToDelete);
    this.dailyBalanceDelete(transactionToDelete);
    this.updateData();
  }

  private deleteTransactionWithOutUpdating(transactionToDelete: Transaction) {
    this.data.transactions = this.data.transactions.filter(
      (transaction) => transaction.id !== transactionToDelete.id
    );
    const account: Account = this.data.accounts.find(
      (account) => account.id === transactionToDelete.account
    );
    if (
      this.getCategoryType(transactionToDelete.budgetCategory) ===
      'expensesCategories'
    ) {
      account.balance = account.balance + transactionToDelete.value;
    } else if (
      this.getCategoryType(transactionToDelete.budgetCategory) ===
      'incomeCategories'
    ) {
      account.balance = account.balance - transactionToDelete.value;
    }
  }

  addNewCategory(budgetCategory: BudgetCategory, type: string) {
    let newId = '';

    if (type === 'expensesCategories') {
      newId = '1';
    }
    if (type === 'incomeCategories') {
      newId = '2';
    }
    if (type === 'savingCategories') {
      newId = '3';
    }
    if (this.data.budget[type].length === 0) {
      budgetCategory.id = Number(newId + '0');
    } else {
      const lastId = String(
        this.data.budget[type][this.data.budget[type].length - 1].id
      ).substring(1);
      budgetCategory.id = Number(newId + String(Number(lastId) + 1));
    }
    this.data.budget[type].push(budgetCategory);
    this.updateData();
  }

  editCategory(budgetCategory: BudgetCategory, type: string) {
    const oldCategory: BudgetCategory = this.getCategoryById(
      budgetCategory.id,
      type
    );
    oldCategory.name = budgetCategory.name;
    oldCategory.max = budgetCategory.max;
    oldCategory.color = budgetCategory.color;
    this.updateData();
  }

  deleteCategory(budgetCategory: BudgetCategory) {
    this.getTransactionsOfBudgetCategory(budgetCategory.id).forEach(
      (transaction) => this.deleteTransactionWithOutUpdating(transaction)
    );

    const type = this.getCategoryType(budgetCategory.id);
    this.data.budget[type] = this.data.budget[type].filter(
      (category) => category.id !== budgetCategory.id
    );
    this.updateData();
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

  checkCategoryNameEdit(oldName: string, newName: string) {
    if (oldName === newName) return true;
    return this.checkCategoryName(newName);
  }

  getCategoryType(id: number) {
    if (String(id)[0] === '1') {
      return 'expensesCategories';
    }
    if (String(id)[0] === '2') {
      return 'incomeCategories';
    }
    if (String(id)[0] === '3') {
      return 'savingCategories';
    }
    return null;
  }

  addNewAccount(account: Account) {
    if (this.data.accounts.length === 0) {
      account.id = 0;
    } else {
      account.id = this.data.accounts[this.data.accounts.length - 1].id + 1;
    }
    this.data.accounts.push(account);
    this.updateData();
  }

  editAccount(account: Account) {
    const oldAccount = this.getAccountById(account.id);
    oldAccount.name = account.name;
    oldAccount.balance = account.balance;
    this.updateData();
  }

  deleteAccount(id: number) {
    this.data.accounts = this.data.accounts.filter((account) => {
      return account.id !== id;
    });
    this.data.transactions = this.data.transactions.filter((transaction) => {
      return transaction.account !== id;
    });
    this.updateData();
  }

  checkAccountName(name: string) {
    const accountNames = [];
    this.data.accounts.forEach((el) => {
      accountNames.push(el.name);
    });
    return !accountNames.includes(name);
  }

  checkAccountNameEdit(oldName: string, newName: string) {
    if (oldName === newName) return true;
    return this.checkAccountName(newName);
  }

  getChartInfo(): { time: string; value: number }[] {
    return this.data.dailyBalance;
  }

  dailyBalanceAdd(transaction: Transaction) {
    const date = `${transaction.date.getFullYear()}-${(
      '0' +
      (transaction.date.getMonth() + 1)
    ).slice(-2)}-${('0' + transaction.date.getDate()).slice(-2)}`;

    let existingEntrance = this.data.dailyBalance.find((objeto) => {
      return objeto.time === date;
    });

    if (existingEntrance === undefined) {
      this.data.dailyBalance.push({ time: date, value: this.getBalance() });
    } else {
      existingEntrance.value = this.getBalance();
    }
  }

  dailyBalanceEdit(oldTransaction: Transaction, transaction: Transaction) {
    const date = `${oldTransaction.date.getFullYear()}-${(
      '0' +
      (oldTransaction.date.getMonth() + 1)
    ).slice(-2)}-${('0' + oldTransaction.date.getDate()).slice(-2)}`;

    let existingEntrance = this.data.dailyBalance.find((objeto) => {
      return objeto.time === date;
    });

    const index = this.data.dailyBalance.indexOf(existingEntrance);

    const oldCategory = this.getCategoryType(oldTransaction.budgetCategory);

    const newCategory = this.getCategoryType(transaction.budgetCategory);

    for (let i = index; i < this.data.dailyBalance.length; i++) {
      const entrance = this.data.dailyBalance[i];

      if (oldCategory === 'expensesCategories') {
        entrance.value = entrance.value + oldTransaction.value;
      } else if (oldCategory === 'incomeCategories') {
        entrance.value = entrance.value - oldTransaction.value;
      }

      if (newCategory === 'expensesCategories') {
        entrance.value = entrance.value - transaction.value;
      } else if (newCategory === 'incomeCategories') {
        entrance.value = entrance.value + transaction.value;
      }
    }
  }

  dailyBalanceDelete(transaction: Transaction) {
    const date = `${transaction.date.getFullYear()}-${(
      '0' +
      (transaction.date.getMonth() + 1)
    ).slice(-2)}-${('0' + transaction.date.getDate()).slice(-2)}`;

    let existingEntrance = this.data.dailyBalance.find((objeto) => {
      return objeto.time === date;
    });

    const index = this.data.dailyBalance.indexOf(existingEntrance);

    const category = this.getCategoryType(transaction.budgetCategory);

    for (let i = index; i < this.data.dailyBalance.length; i++) {
      const entrance = this.data.dailyBalance[i];
      if (category === 'expensesCategories') {
        entrance.value = entrance.value + transaction.value;
      } else if (category === 'incomeCategories') {
        entrance.value = entrance.value - transaction.value;
      }
    }
  }
}

export const ERROR = 'Ha ocurrido al enviar la información.';
