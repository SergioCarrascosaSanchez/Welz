import { BudgetCategory } from './budgetCategory.model';

export interface Transaction {
  description: string;
  budgetCategory: BudgetCategory;
  account: string;
  value: number;
  date: Date;
}
