import { Account } from './account.model';
import { Budget } from './budget.model';
import { Transaction } from './transaction.model';

export interface UserData {
  username: string;
  balance: number;
  budget: Budget;
  accounts: Account[];
  transactions: Transaction[];
}
