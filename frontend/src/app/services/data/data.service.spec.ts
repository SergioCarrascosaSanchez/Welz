import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { DataService, ERROR } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { UserData } from 'src/app/interfaces/userData.model';

describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'user',
            component: DumbComponent,
          },
          {
            path: 'auth',
            component: DumbComponent,
          },
        ]),
      ],
      providers: [DataService],
    });

    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  describe('http requests', () => {
    it('should fetch data correctly', () => {
      let error: null | string;
      dataService.error.subscribe((newError) => {
        error = newError;
      });

      let load: boolean;
      dataService.loadedData.subscribe((loadChange) => {
        load = loadChange;
      });

      let dataChangedIsCalled = false;
      dataService.dataChange.subscribe(() => {
        dataChangedIsCalled = true;
      });

      const fakeId = 'fakeId';
      const fakeToken = 'fakeToken';

      spyOn(localStorage, 'getItem').and.callFake((key) => {
        // Devuelve valores diferentes basados en la clave
        if (key === 'id') {
          return fakeId;
        } else if (key === 'token') {
          return fakeToken;
        } else {
          return null;
        }
      });

      dataService.fetchData();

      const req: TestRequest = httpTestingController.expectOne(
        `${dataService.url}${fakeId}?auth=${fakeToken}`
      );

      expect(req.request.method).toBe('GET');
      req.flush(completeData);

      expect(error).toBeNull();
      expect(load).toBe(true);
      expect(dataChangedIsCalled).toBeTrue();

      expect(dataService.getData()).toEqual(
        dataService.prepareData(completeData)
      );
    });

    it('should emit an error when fail', () => {
      let error: null | string;
      dataService.error.subscribe((newError) => {
        error = newError;
      });

      let load: boolean;
      dataService.loadedData.subscribe((loadChange) => {
        load = loadChange;
      });

      let dataChangedIsCalled = false;
      dataService.dataChange.subscribe(() => {
        dataChangedIsCalled = true;
      });

      const fakeId = 'fakeId';
      const fakeToken = 'fakeToken';

      spyOn(localStorage, 'getItem').and.callFake((key) => {
        // Devuelve valores diferentes basados en la clave
        if (key === 'id') {
          return fakeId;
        } else if (key === 'token') {
          return fakeToken;
        } else {
          return null;
        }
      });

      dataService.fetchData();

      const req: TestRequest = httpTestingController.expectOne(
        `${dataService.url}${fakeId}?auth=${fakeToken}`
      );

      expect(req.request.method).toBe('GET');
      req.flush('', { status: 401, statusText: 'Unauthorized' });

      expect(error).toBe(ERROR);
      expect(load).toBeFalse();
      expect(dataChangedIsCalled).toBeFalse();

      expect(dataService.getData()).toEqual(undefined);
    });

    it('should update data correctly', () => {
      let error: null | string;
      dataService.error.subscribe((newError) => {
        error = newError;
      });

      let dataChangedIsCalled = false;
      dataService.dataChange.subscribe(() => {
        dataChangedIsCalled = true;
      });

      const fakeId = 'fakeId';
      const fakeToken = 'fakeToken';

      spyOn(localStorage, 'getItem').and.callFake((key) => {
        // Devuelve valores diferentes basados en la clave
        if (key === 'id') {
          return fakeId;
        } else if (key === 'token') {
          return fakeToken;
        } else {
          return null;
        }
      });

      dataService.updateData();

      const req: TestRequest = httpTestingController.expectOne(
        `${dataService.url}${fakeId}?auth=${fakeToken}`
      );

      expect(req.request.method).toBe('PUT');
      req.flush('', { status: 200, statusText: 'OK' });

      expect(error).toBeNull();
      expect(dataChangedIsCalled).toBeTrue();
    });

    it('should emit an error when fail updating', () => {
      let error: null | string;
      dataService.error.subscribe((newError) => {
        error = newError;
      });

      let dataChangedIsCalled = false;
      dataService.dataChange.subscribe(() => {
        dataChangedIsCalled = true;
      });

      const fakeId = 'fakeId';
      const fakeToken = 'fakeToken';

      spyOn(localStorage, 'getItem').and.callFake((key) => {
        // Devuelve valores diferentes basados en la clave
        if (key === 'id') {
          return fakeId;
        } else if (key === 'token') {
          return fakeToken;
        } else {
          return null;
        }
      });

      dataService.updateData();

      const req: TestRequest = httpTestingController.expectOne(
        `${dataService.url}${fakeId}?auth=${fakeToken}`
      );

      expect(req.request.method).toBe('PUT');
      req.flush('', { status: 401, statusText: 'Unauthorized' });

      expect(error).toBe(ERROR);
      expect(dataChangedIsCalled).toBeFalse();

      expect(dataService.getData()).toEqual(undefined);
    });

    it('should initialize data correctly', () => {
      const emptyData = {
        username: 'TestUsername',
      };

      const preparedData: UserData = dataService.prepareData(emptyData);

      expect(preparedData.username).toBe(emptyData.username);
      expect(preparedData.dailyBalance).toEqual([]);
      expect(preparedData.budget).not.toBeUndefined();
      expect(preparedData.budget.expensesCategories).toEqual([]);
      expect(preparedData.budget.incomeCategories).toEqual([]);
      expect(preparedData.budget.savingCategories).toEqual([]);
      expect(preparedData.accounts).toEqual([]);
      expect(preparedData.transactions).toEqual([]);
    });

    it('should prepare dates correctly', () => {
      const preparedData: UserData = dataService.prepareData(completeData);

      expect(typeof preparedData.transactions[0].date).toEqual('object');
      expect(preparedData.transactions[0].date instanceof Date).toBeTrue();
    });
  });

  describe('miscellaneous functions', () => {
    beforeEach(() => {
      dataService.setData(dataService.prepareData(completeData));
    });

    it('should return data', () => {
      dataService.setData(dataService.prepareData(completeData));
      expect(dataService.getData()).toEqual(
        dataService.prepareData(completeData)
      );
    });

    it('should return username', () => {
      dataService.setData(dataService.prepareData(completeData));

      expect(dataService.getUsername()).toEqual(
        dataService.prepareData(completeData).username
      );
    });
  });

  describe('budget', () => {
    beforeEach(() => {
      dataService.setData(dataService.prepareData(completeData));
      spyOn(dataService, 'updateData').and.stub();
    });

    it('should return budget', () => {
      expect(dataService.getBudget()).toEqual(
        dataService.prepareData(completeData).budget
      );
    });

    it('should return budget category by id', () => {
      expect(dataService.getCategoryById(10, 'expensesCategories')).toEqual(
        dataService
          .prepareData(completeData)
          .budget.expensesCategories.filter((category) => category.id === 10)[0]
      );

      expect(
        dataService.getCategoryById(10, 'incomeCategories')
      ).toBeUndefined();
    });

    it('should return budget category by name', () => {
      expect(
        dataService.getCategoryTypeByName(
          completeData.budget.expensesCategories[0].name
        )
      ).toEqual('expensesCategories');

      expect(
        dataService.getCategoryTypeByName(
          completeData.budget.incomeCategories[0].name
        )
      ).toEqual('incomeCategories');

      expect(
        dataService.getCategoryTypeByName(
          completeData.budget.savingCategories[0].name
        )
      ).toEqual('savingCategories');

      expect(dataService.getCategoryTypeByName('Test name')).toBeNull();
    });

    it('should return all budget categories', () => {
      expect(dataService.getBudgetCategories()).toEqual(
        dataService
          .prepareData(completeData)
          .budget.expensesCategories.concat(
            dataService.prepareData(completeData).budget.incomeCategories
          )
          .concat(dataService.prepareData(completeData).budget.savingCategories)
      );
    });

    it('should add, edit and delete category', () => {
      const name1 = 'Test category';
      const max1 = 100;
      const color1 = 'red';

      const name2 = 'Test category 2';
      const max2 = 200;
      const color2 = 'blue';

      const initialNumberOfTransactions =
        dataService.getBudget().expensesCategories.length;

      dataService.addNewCategory(
        {
          name: name1,
          max: max1,
          color: color1,
        },
        'expensesCategories'
      );

      const id: number = dataService
        .getBudget()
        .expensesCategories.filter(
          (transaction) => transaction.name === name1
        )[0].id;

      expect(dataService.getBudget().expensesCategories.length).toEqual(
        initialNumberOfTransactions + 1
      );
      expect(
        dataService.getCategoryById(id, 'expensesCategories').name
      ).toEqual(name1);
      expect(dataService.getCategoryById(id, 'expensesCategories').max).toEqual(
        max1
      );
      expect(
        dataService.getCategoryById(id, 'expensesCategories').color
      ).toEqual(color1);

      dataService.editCategory(
        {
          id: id,
          name: name2,
          max: max2,
          color: color2,
        },
        'expensesCategories'
      );

      expect(dataService.getBudget().expensesCategories.length).toEqual(
        initialNumberOfTransactions + 1
      );
      expect(
        dataService.getCategoryById(id, 'expensesCategories').name
      ).toEqual(name2);
      expect(dataService.getCategoryById(id, 'expensesCategories').max).toEqual(
        max2
      );
      expect(
        dataService.getCategoryById(id, 'expensesCategories').color
      ).toEqual(color2);

      expect(
        dataService.getCategoryById(id, 'expensesCategories').name
      ).not.toEqual(name1);
      expect(
        dataService.getCategoryById(id, 'expensesCategories').max
      ).not.toEqual(max1);
      expect(
        dataService.getCategoryById(id, 'expensesCategories').color
      ).not.toEqual(color1);

      dataService.deleteCategory({
        id: id,
        name: name2,
        max: max2,
        color: color2,
      });

      expect(dataService.getBudget().expensesCategories.length).toEqual(
        initialNumberOfTransactions
      );
    });

    it('should return true if the name is not used', () => {
      expect(
        dataService.checkCategoryName(
          completeData.budget.expensesCategories[0].name
        )
      ).toBeFalse();
      expect(
        dataService.checkCategoryName(
          completeData.budget.incomeCategories[0].name
        )
      ).toBeFalse();
      expect(
        dataService.checkCategoryName(
          completeData.budget.savingCategories[0].name
        )
      ).toBeFalse();

      expect(dataService.checkCategoryName('FakeName')).toBeTrue();
    });

    it('should return true if the name is not used or if is the same as given', () => {
      expect(
        dataService.checkCategoryNameEdit(
          'FakeName',
          completeData.budget.expensesCategories[0].name
        )
      ).toBeFalse();
      expect(
        dataService.checkCategoryNameEdit(
          'FakeName',
          completeData.budget.incomeCategories[0].name
        )
      ).toBeFalse();
      expect(
        dataService.checkCategoryNameEdit(
          'FakeName',
          completeData.budget.savingCategories[0].name
        )
      ).toBeFalse();

      expect(
        dataService.checkCategoryNameEdit('FakeName', 'OtherFakeName')
      ).toBeTrue();

      expect(
        dataService.checkCategoryNameEdit(
          completeData.budget.expensesCategories[0].name,
          completeData.budget.expensesCategories[0].name
        )
      ).toBeTrue();
      expect(
        dataService.checkCategoryNameEdit(
          completeData.budget.incomeCategories[0].name,
          completeData.budget.incomeCategories[0].name
        )
      ).toBeTrue();
      expect(
        dataService.checkCategoryNameEdit(
          completeData.budget.savingCategories[0].name,
          completeData.budget.savingCategories[0].name
        )
      ).toBeTrue();
    });

    it('should return category type by its id', () => {
      expect(dataService.getCategoryType(10)).toEqual('expensesCategories');

      expect(dataService.getCategoryType(11010298120)).toEqual(
        'expensesCategories'
      );

      expect(dataService.getCategoryType(20)).toEqual('incomeCategories');
      expect(dataService.getCategoryType(212387123)).toEqual(
        'incomeCategories'
      );

      expect(dataService.getCategoryType(30)).toEqual('savingCategories');
      expect(dataService.getCategoryType(312387123)).toEqual(
        'savingCategories'
      );

      expect(dataService.getCategoryType(40)).toBeNull();
      expect(dataService.getCategoryType(50)).toBeNull();
      expect(dataService.getCategoryType(60)).toBeNull();
      expect(dataService.getCategoryType(0)).toBeNull();
    });
  });

  describe('transactions', () => {
    beforeEach(() => {
      dataService.setData(dataService.prepareData(completeData));
      spyOn(dataService, 'updateData').and.stub();
    });

    it('should return all transactions', () => {
      expect(dataService.getTransactions()).toEqual(
        dataService.prepareData(completeData).transactions
      );
    });

    it('should return transactions by id', () => {
      expect(dataService.getTransactionById(0)).toEqual(
        dataService
          .prepareData(completeData)
          .transactions.filter((transaction) => {
            return transaction.id === 0;
          })[0]
      );
    });

    it('should return transactions by account', () => {
      expect(dataService.getTransactionsOfAccount(0)).toEqual(
        dataService
          .prepareData(completeData)
          .transactions.filter((transaction) => {
            return transaction.account === 0;
          })
      );
    });

    it('should return transactions by category', () => {
      expect(dataService.getTransactionsOfBudgetCategory(20)).toEqual(
        dataService
          .prepareData(completeData)
          .transactions.filter((transaction) => {
            return transaction.budgetCategory === 20;
          })
      );
    });

    it('should return transactions by category and date', () => {
      expect(
        dataService.getTransactionsOfBudgetCategoryByDate(
          20,
          new Date('2023-11-27T08:26:40.515Z')
        )
      ).toEqual(
        dataService
          .prepareData(completeData)
          .transactions.filter((transaction) => {
            return (
              transaction.budgetCategory === 20 &&
              transaction.date.getFullYear() ===
                new Date('2023-11-27T08:26:40.515Z').getFullYear() &&
              transaction.date.getMonth() ===
                new Date('2023-11-27T08:26:40.515Z').getMonth()
            );
          })
      );
    });

    it('should add, edit and delete transaction', () => {
      const description1 = 'Test transaction';
      const description2 = 'Test transaction 2';

      const value1 = 10;
      const value2 = 20;

      const budgetCategory1 = 20;
      const budgetCategory2 = 10;

      const account1 = 1;
      const account2 = 2;

      const initialNumberOfTransactions = dataService.getTransactions().length;

      const initialBalance = dataService.getBalance();

      const date = new Date();

      dataService.addNewTransaction({
        description: description1,
        value: value1,
        budgetCategory: budgetCategory1,
        account: account1,
        date: date,
      });

      const id = dataService.getTransactions()[0].id;

      expect(
        dataService.getChartInfo()[dataService.getChartInfo().length - 1].value
      ).toEqual(initialBalance + value1);

      expect(dataService.getBalance()).toEqual(initialBalance + value1);

      expect(dataService.getTransactions().length).toEqual(
        initialNumberOfTransactions + 1
      );

      expect(dataService.getTransactionById(id).description).toEqual(
        description1
      );
      expect(dataService.getTransactionById(id).value).toEqual(value1);
      expect(dataService.getTransactionById(id).budgetCategory).toEqual(
        budgetCategory1
      );
      expect(dataService.getTransactionById(id).account).toEqual(account1);

      dataService.editTransaction(id, {
        description: description2,
        value: value2,
        budgetCategory: budgetCategory2,
        account: account2,
        date: new Date(),
      });

      expect(
        dataService.getChartInfo()[dataService.getChartInfo().length - 1].value
      ).toEqual(initialBalance - value2);

      expect(dataService.getBalance()).toEqual(initialBalance - value2);

      expect(dataService.getTransactions().length).toEqual(
        initialNumberOfTransactions + 1
      );

      expect(dataService.getTransactionById(id).description).toEqual(
        description2
      );
      expect(dataService.getTransactionById(id).value).toEqual(value2);
      expect(dataService.getTransactionById(id).budgetCategory).toEqual(
        budgetCategory2
      );
      expect(dataService.getTransactionById(id).account).toEqual(account2);

      dataService.deleteTransaction({
        id: id,
        description: description2,
        value: value2,
        budgetCategory: budgetCategory2,
        account: account2,
        date: new Date(),
      });

      expect(
        dataService.getChartInfo()[dataService.getChartInfo().length - 1].value
      ).toEqual(initialBalance);

      expect(dataService.getBalance()).toEqual(initialBalance);

      expect(dataService.getTransactions().length).toEqual(
        initialNumberOfTransactions
      );

      expect(dataService.getTransactionById(id)).toBeUndefined();
    });

    it('should update correctly dailyBalance and Balance when edit the category ', () => {
      dataService.setData(
        dataService.prepareData(JSON.parse(JSON.stringify(transactionEditData)))
      );

      const value = transactionEditData.transactions[1].value;
      const initialBalance = transactionEditData.accounts[0].balance;

      const category1 = 30;
      const category2 = 20;
      const category3 = 10;

      dataService.editTransaction(transactionEditData.transactions[1].id, {
        description: transactionEditData.transactions[1].description,
        value: value,
        budgetCategory: category1,
        account: transactionEditData.transactions[1].account,
        date: new Date(transactionEditData.transactions[1].date),
      });

      expect(dataService.getBalance()).toEqual(initialBalance + value);

      expect(dataService.getChartInfo()[2].value).toEqual(
        transactionEditData.dailyBalance[2].value + value
      );
      expect(dataService.getChartInfo()[1].value).toEqual(
        transactionEditData.dailyBalance[1].value + value
      );
      expect(dataService.getChartInfo()[0].value).toEqual(
        transactionEditData.dailyBalance[0].value
      );

      dataService.editTransaction(transactionEditData.transactions[1].id, {
        description: transactionEditData.transactions[1].description,
        value: value,
        budgetCategory: category2,
        account: transactionEditData.transactions[1].account,
        date: new Date(transactionEditData.transactions[1].date),
      });

      expect(dataService.getBalance()).toEqual(initialBalance + value * 2);

      expect(dataService.getChartInfo()[2].value).toEqual(
        transactionEditData.dailyBalance[2].value + value * 2
      );
      expect(dataService.getChartInfo()[1].value).toEqual(
        transactionEditData.dailyBalance[1].value + value * 2
      );
      expect(dataService.getChartInfo()[0].value).toEqual(
        transactionEditData.dailyBalance[0].value
      );

      dataService.editTransaction(transactionEditData.transactions[1].id, {
        description: transactionEditData.transactions[1].description,
        value: value,
        budgetCategory: category3,
        account: transactionEditData.transactions[1].account,
        date: new Date(transactionEditData.transactions[1].date),
      });

      expect(dataService.getBalance()).toEqual(initialBalance);

      expect(dataService.getChartInfo()[2].value).toEqual(
        transactionEditData.dailyBalance[2].value
      );
      expect(dataService.getChartInfo()[1].value).toEqual(
        transactionEditData.dailyBalance[1].value
      );
      expect(dataService.getChartInfo()[0].value).toEqual(
        transactionEditData.dailyBalance[0].value
      );
    });
    it('should update correctly dailyBalance and Balance when deleting and old transaction ', () => {
      dataService.setData(
        dataService.prepareData(JSON.parse(JSON.stringify(transactionEditData)))
      );

      const value = transactionEditData.transactions[1].value;
      const initialBalance = transactionEditData.accounts[0].balance;

      dataService.deleteTransaction({
        id: transactionEditData.transactions[1].id,
        description: transactionEditData.transactions[1].description,
        value: value,
        budgetCategory: transactionEditData.transactions[1].budgetCategory,
        account: transactionEditData.transactions[1].account,
        date: new Date(transactionEditData.transactions[1].date),
      });

      expect(dataService.getBalance()).toEqual(initialBalance + value);

      expect(dataService.getChartInfo()[2].value).toEqual(
        transactionEditData.dailyBalance[2].value + value
      );
      expect(dataService.getChartInfo()[1].value).toEqual(
        transactionEditData.dailyBalance[1].value + value
      );
      expect(dataService.getChartInfo()[0].value).toEqual(
        transactionEditData.dailyBalance[0].value
      );
    });
  });

  describe('accounts', () => {
    beforeEach(() => {
      dataService.setData(dataService.prepareData(completeData));
      spyOn(dataService, 'updateData').and.stub();
    });

    it('should return accounts', () => {
      expect(dataService.getAccounts()).toEqual(completeData.accounts);
    });

    it('should return account by id', () => {
      expect(dataService.getAccountById(1)).toEqual(completeData.accounts[0]);
      expect(dataService.getAccountById(2)).toEqual(completeData.accounts[1]);
    });

    it('should add, edit and delete new account', () => {
      const balance1 = 1000;
      const name1 = 'TestAccount';

      const balance2 = 2000;
      const name2 = 'TestAccount 2';

      dataService.addNewAccount({ name: name1, balance: balance1 });

      expect(dataService.getAccounts().length).toEqual(3);
      expect(dataService.getAccountById(3).name).toEqual(name1);
      expect(dataService.getAccountById(3).balance).toEqual(balance1);

      dataService.editAccount({
        id: 3,
        name: name2,
        balance: balance2,
      });
      expect(dataService.getAccounts().length).toEqual(3);

      expect(dataService.getAccountById(3).name).not.toEqual(name1);
      expect(dataService.getAccountById(3).balance).not.toEqual(balance1);
      expect(dataService.getAccountById(3).name).toEqual(name2);
      expect(dataService.getAccountById(3).balance).toEqual(balance2);

      dataService.deleteAccount(3);
      expect(dataService.getAccounts().length).toEqual(2);
      expect(dataService.getAccountById(3)).toBeUndefined();
    });

    it('should check if the account name already exists', () => {
      expect(
        dataService.checkAccountName(completeData.accounts[0].name)
      ).toBeFalse();
      expect(
        dataService.checkAccountName(completeData.accounts[1].name)
      ).toBeFalse();
      expect(dataService.checkAccountName('Fake AccountName')).toBeTrue();
    });

    it('should check if the account name already exists but return true if is the same', () => {
      expect(
        dataService.checkAccountNameEdit(
          completeData.accounts[0].name,
          'FakeName'
        )
      ).toBeTrue();
      expect(
        dataService.checkAccountNameEdit(
          completeData.accounts[1].name,
          'FakeName'
        )
      ).toBeTrue();

      expect(
        dataService.checkAccountNameEdit(
          completeData.accounts[0].name,
          completeData.accounts[1].name
        )
      ).toBeFalse();

      expect(
        dataService.checkAccountNameEdit('FakeName', 'OtherFakeName')
      ).toBeTrue();

      expect(
        dataService.checkAccountNameEdit(
          completeData.accounts[0].name,
          completeData.accounts[0].name
        )
      ).toBeTrue();
      expect(
        dataService.checkAccountNameEdit(
          completeData.accounts[1].name,
          completeData.accounts[1].name
        )
      ).toBeTrue();
    });
  });
});

@Component({
  selector: 'app-dumb-component',
  template: '<div></div>',
  styleUrls: [],
})
class DumbComponent {}

const completeData = {
  accounts: [
    {
      balance: 15070,
      id: 1,
      name: 'Ahorro',
    },
    {
      balance: 4200,
      id: 2,
      name: 'Gastos corrientes',
    },
  ],
  dailyBalance: [
    { time: '2023-11-24', value: 19270 },
    { time: '2023-11-27', value: 19270 },
    { time: '2023-12-27', value: 19270 },
  ],
  budget: {
    expensesCategories: [
      {
        color: 'rgb(52, 73, 94)',
        id: 10,
        max: 1000,
        name: 'Fijos',
      },
      {
        color: 'rgb(155, 89, 182)',
        id: 11,
        max: 200,
        name: 'Ocio',
      },
    ],
    incomeCategories: [
      {
        color: 'rgb(46, 204, 113)',
        id: 20,
        max: 3200,
        name: 'Nómina',
      },
    ],
    savingCategories: [
      {
        color: 'rgb(52, 152, 219)',
        id: 30,
        max: 250,
        name: 'Vacaciones',
      },
    ],
  },
  transactions: [
    {
      account: 2,
      budgetCategory: 11,
      date: '2023-12-27T08:32:42.934Z',
      description: 'Bolera',
      id: 3,
      value: 10,
    },
    {
      account: 2,
      budgetCategory: 20,
      date: '2023-11-27T08:26:40.515Z',
      description: 'Nómina',
      id: 2,
      value: 1700,
    },
    {
      account: 1,
      budgetCategory: 30,
      date: '2023-11-27T08:26:40.515Z',
      description: 'Ahorro mensual vacaciones 2024',
      id: 1,
      value: 200,
    },
    {
      account: 2,
      budgetCategory: 10,
      date: '2023-11-24T14:34:35.442Z',
      description: 'Hipoteca',
      id: 0,
      value: 900,
    },
  ],
  username: 'Sergio',
};

const transactionEditData = {
  accounts: [
    {
      balance: 900,
      id: 0,
      name: 'Cuenta',
    },
  ],
  dailyBalance: [
    { time: '2022-12-31', value: 900 },
    { time: '2023-01-01', value: 800 },
    { time: '2023-01-02', value: 1000 },
  ],
  budget: {
    expensesCategories: [
      {
        color: 'rgb(52, 73, 94)',
        id: 10,
        max: 1000,
        name: 'Gasto',
      },
    ],
    incomeCategories: [
      {
        color: 'rgb(46, 204, 113)',
        id: 20,
        max: 3200,
        name: 'Ingreso',
      },
    ],
    savingCategories: [
      {
        color: 'rgb(52, 152, 219)',
        id: 30,
        max: 250,
        name: 'Ahorro',
      },
    ],
  },
  transactions: [
    {
      account: 0,
      budgetCategory: 20,
      date: '2023-01-02T08:26:40.515Z',
      description: 'Ingreso',
      id: 2,
      value: 100,
    },
    {
      account: 0,
      budgetCategory: 10,
      date: '2023-01-01T08:26:40.515Z',
      description: 'Gasto',
      id: 1,
      value: 200,
    },
    {
      account: 0,
      budgetCategory: 20,
      date: '2022-12-31T14:34:35.442Z',
      description: 'Ingreso',
      id: 0,
      value: 500,
    },
  ],
  username: 'Sergio',
};
