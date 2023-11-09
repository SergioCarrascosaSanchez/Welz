import { Account } from './account.model';
import { BudgetCategory } from './budgetCategory.model';

export interface Transaction {
  id?: number;
  description: string;
  budgetCategory: BudgetCategory;
  account: Account;
  value: number;
  date: Date;
}
