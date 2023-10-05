export interface Transaction {
  description: string;
  budgetCategory: string; //(catergorias definidas por el usuario)
  account: string;
  value: number;
  date: Date;
}
