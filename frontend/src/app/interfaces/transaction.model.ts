import { BudgetCategory } from './budgetCategory.model';

export interface Transaction {
  id?: number;
  description: string;
  budgetCategory: number;
  account: number;
  value: number;
  date: Date;
}
