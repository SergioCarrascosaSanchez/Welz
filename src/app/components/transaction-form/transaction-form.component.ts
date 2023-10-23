import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
})
export class TransactionFormComponent {
  constructor(private dataService: DataService) {}

  transactionForm = new FormGroup({
    description: new FormControl<string>(null),
    quantity: new FormControl<number>(null),
    category: new FormControl(null),
    account: new FormControl(null),
  });

  categories: BudgetCategory[];
  accounts: Account[];

  ngOnInit() {
    this.categories = this.dataService.getBudgetCategories();
    this.accounts = this.dataService.getAccounts();
  }

  onSubmit() {
    console.log(this.transactionForm.value);
    this.clearForm();
  }

  clearForm() {
    this.transactionForm = new FormGroup({
      description: new FormControl<string>(null),
      quantity: new FormControl<number>(null),
      category: new FormControl(null),
      account: new FormControl(null),
    });
  }
}
