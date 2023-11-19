import { EventEmitter, Injectable } from '@angular/core';
import { UserData } from '../interfaces/userData.model';
import { Transaction } from '../interfaces/transaction.model';
import { BudgetCategory } from '../interfaces/budgetCategory.model';
import { Account } from '../interfaces/account.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { transition } from '@angular/animations';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataChange = new EventEmitter<void>();
  private url =
    'https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app/';
  loadedData = new BehaviorSubject<boolean>(false);
  private data: UserData = undefined;

  private errorSubject = new BehaviorSubject<string | null>(null);
  error = this.errorSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log('fecht data');
    this.fetchData();
  }

  fetchData() {
    this.http
      .get<UserData>(`${this.url}/${localStorage.getItem('id')}.json`, {
        params: new HttpParams().set('auth', localStorage.getItem('token')),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status.toString() === '401') {
            this.router.navigate(['/auth']);
          }
          this.errorSubject.next(ERROR);
          return throwError(error.error.error.message);
        })
      )
      .subscribe((response) => {
        this.errorSubject.next(null);
        this.prepareData(response);
        this.data = this.prepareData(response);
        this.loadedData.next(true);
        this.dataChange.emit();
      });
  }

  prepareData(newData: UserData) {
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
    return newData;
  }

  updateData() {
    this.http
      .put<UserData>(
        `${this.url}/${localStorage.getItem('id')}/.json`,
        this.data,
        {
          params: new HttpParams().set('auth', localStorage.getItem('token')),
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorSubject.next(ERROR);
          return throwError(error.error.error.message);
        })
      )
      .subscribe((response) => {
        this.errorSubject.next(null);
        this.dataChange.emit();
      });
  }

  getData() {
    return this.data;
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

  getTransactionsOfAccount(accountId: number) {
    const transactions = this.data.transactions.filter(
      (transaction) => transaction.account === accountId
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
      this.data.budget.expensesCategories.includes(transaction.budgetCategory)
    ) {
      account.balance = account.balance - transaction.value;
    } else if (
      this.data.budget.incomeCategories.includes(transaction.budgetCategory)
    ) {
      account.balance = account.balance + transaction.value;
    }
    this.updateData();
  }

  deleteTransaction(transactionToDelete: Transaction) {
    console.log('Deleted');
    this.data.transactions = this.data.transactions.filter(
      (transaction) => transaction.id !== transactionToDelete.id
    );
    const account: Account = this.data.accounts.find(
      (account) => account.id === transactionToDelete.account
    );
    if (
      this.data.budget.expensesCategories.includes(
        transactionToDelete.budgetCategory
      )
    ) {
      account.balance = account.balance + transactionToDelete.value;
    } else if (
      this.data.budget.incomeCategories.includes(
        transactionToDelete.budgetCategory
      )
    ) {
      account.balance = account.balance - transactionToDelete.value;
    }
    console.log('Deleted');
    this.updateData();
  }

  addNewCategory(budgetCategory: BudgetCategory, type: string) {
    if (this.data.budget[type].length === 0) {
      budgetCategory.id = 0;
    } else {
      budgetCategory.id =
        this.data.budget[type][this.data.budget[type].length - 1].id + 1;
    }
    this.data.budget[type].push(budgetCategory);
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
}

export const ERROR = 'Ha ocurrido al enviar la información.';
