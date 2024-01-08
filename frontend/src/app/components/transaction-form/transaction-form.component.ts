import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { DataService } from 'src/app/services/data/data.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';
import { ALERT_TYPES } from '../alert/alert.component';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/interfaces/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
})
export class TransactionFormComponent {
  @Input() open: boolean;
  @Input() edit: boolean = false;
  @Input() transactionToEdit: Transaction;

  constructor(private dataService: DataService) {}

  title: string;

  transactionForm = new FormGroup({
    description: new FormControl<string>(null, [EmptyValidator]),
    quantity: new FormControl<number>(null, [
      Validators.min(1),
      EmptyValidator,
    ]),
    category: new FormControl<BudgetCategory>(null, [EmptyValidator]),
    account: new FormControl<Account>(null, [EmptyValidator]),
  });

  categories: BudgetCategory[];
  accounts: Account[];

  invalid = false;

  correctAddition = false;
  correctAdditionMessage = CorrectAdditionMessage;

  errors = '';
  errorSubscription: Subscription;
  errorAlertType = ALERT_TYPES.danger;
  successAlertType = ALERT_TYPES.success;

  buttonText: string = ButtonText;
  editButtonText: string = EditButtonText;

  ngOnInit() {
    this.title = this.edit ? EditTitle : Title;

    this.categories = this.dataService.getBudgetCategories();
    this.accounts = this.dataService.getAccounts();
    this.dataService.dataChange.subscribe(() => {
      this.categories = this.dataService.getBudgetCategories();
      this.accounts = this.dataService.getAccounts();
    });
    this.errorSubscription = this.dataService.error.subscribe((msg) => {
      this.errors = msg;
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onSubmit() {
    this.errors = '';
    if (!this.transactionForm.invalid) {
      if (this.edit) {
        this.dataService.editTransaction(this.transactionToEdit.id, {
          description: this.transactionForm.controls.description.value,
          value: this.transactionForm.controls.quantity.value,
          budgetCategory: this.transactionForm.controls.category.value.id,
          account: this.transactionForm.controls.account.value.id,
          date: new Date(),
        });
      } else {
        this.dataService.addNewTransaction({
          description: this.transactionForm.controls.description.value,
          value: this.transactionForm.controls.quantity.value,
          budgetCategory: this.transactionForm.controls.category.value.id,
          account: this.transactionForm.controls.account.value.id,
          date: new Date(),
        });
        this.resetForm();
      }

      this.invalid = false;
      this.correctAddition = true;
    } else {
      this.manageErrors();
      this.correctAddition = false;
      this.invalid = true;
    }
  }

  resetForm() {
    this.errors = '';
    this.invalid = false;
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

  fillFields() {
    this.transactionForm.controls.description.setValue(
      this.transactionToEdit.description
    );
    this.transactionForm.controls.quantity.setValue(
      this.transactionToEdit.value
    );
    this.transactionForm.controls.account.setValue(
      this.accounts.filter(
        (account) => account.id === this.transactionToEdit.account
      )[0]
    );
    this.transactionForm.controls.category.setValue(
      this.categories.filter(
        (category) => category.id === this.transactionToEdit.budgetCategory
      )[0]
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['open'].isFirstChange()) {
      this.resetForm();
      if (this.edit) {
        this.fillFields();
      }
    }
  }
}

export const MinAndEmptyError: string =
  'Debes rellenar todos los campos e incluir una cantidad mayor que cero.';
export const MinError: string = 'Debes incluir una cantidad mayor que cero.';
export const EmptyError: string = 'Debes rellenar todos los campos.';
export const CorrectAdditionMessage = 'Transacción registrada con éxito';

export const Title: string = 'Nueva transacción';
export const EditTitle = 'Editar transacción';

export const ButtonText: string = 'Añadir transacción';
export const EditButtonText = 'Editar transacción';
