import { BudgetCategory } from './budgetCategory.model';

export interface Budget {
  incomeCategories: BudgetCategory[];
  savingCategories: BudgetCategory[];
  expensesCategories: BudgetCategory[];
}
