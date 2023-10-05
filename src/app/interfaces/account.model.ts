import { Transaction } from './transaction.model';

export interface Account {
  name: string;
  balance: number;
  transactions: Transaction[];
}
