import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { DataService } from 'src/app/services/data.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
})
export class TransactionFormComponent {
  constructor(private dataService: DataService) {}

  transactionForm = new FormGroup({
    description: new FormControl<string>(null, [EmptyValidator]),
    quantity: new FormControl<number>(null, [
      Validators.min(1),
      EmptyValidator,
    ]),
    category: new FormControl<BudgetCategory>(null, [EmptyValidator]),
    account: new FormControl<Account>(null, [EmptyValidator]),
  });

  invalid = false;

  categories: BudgetCategory[];
  accounts: Account[];

  errors = '';

  title = Title;

  ngOnInit() {
    this.categories = this.dataService.getBudgetCategories();
    this.accounts = this.dataService.getAccounts();
  }

  onSubmit() {
    if (!this.transactionForm.invalid && !this.transactionForm.pristine) {
      this.resetForm();
      this.invalid = false;
    } else {
      this.manageErrors();
      this.invalid = true;
    }
  }

  resetForm() {
    this.errors = '';
    this.invalid = true;
    this.transactionForm = new FormGroup({
      description: new FormControl<string>(null, [EmptyValidator]),
      quantity: new FormControl<number>(null, [
        Validators.min(1),
        EmptyValidator,
      ]),
      category: new FormControl(null, [EmptyValidator]),
      account: new FormControl(null, [EmptyValidator]),
    });
  }

  manageErrors() {
    let errorArray = [];
    this.errors = '';
    Object.values(this.transactionForm.controls).forEach(
      (formControl: FormControl) => {
        if (formControl.errors) {
          errorArray = [...errorArray, ...Object.keys(formControl.errors)];
        }
      }
    );
    if (errorArray.includes('min') && errorArray.includes('emptyValue')) {
      this.errors = MinAndEmptyError;
      return;
    }
    if (errorArray.includes('min')) {
      this.errors = MinError;
      return;
    }
    if (errorArray.includes('emptyValue')) {
      this.errors = EmptyError;
      return;
    }
  }
}

export const MinAndEmptyError: string =
  'Debes rellenar todos los campos e incluir una cantidad mayor que cero.';
export const MinError: string = 'Debes incluir una cantidad mayor que cero.';
export const EmptyError: string = 'Debes rellenar todos los campos.';
export const Title: string = 'Nueva transacción';
