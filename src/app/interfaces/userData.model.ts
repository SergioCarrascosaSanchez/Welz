import { Account } from './account.model';
import { Budget } from './budget.model';
import { Transaction } from './transaction.model';

export interface UserData {
  username: string;
  dailyBalance: {
    time: string;
    value: number;
  }[];
  budget: Budget;
  accounts: Account[];
  transactions: Transaction[];
}
