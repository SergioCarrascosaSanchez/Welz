import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';
import { ALERT_TYPES } from '../alert/alert.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent {
  constructor(private dataService: DataService) {}

  title = Title;

  accountForm = new FormGroup({
    description: new FormControl<string>(null, [EmptyValidator]),
    balance: new FormControl<number>(null, [EmptyValidator, Validators.min(0)]),
  });

  invalid = false;

  correctAddition = false;
  correctAdditionMessage = CorrectAdditionMessage;

  errors = '';
  errorSubscription: Subscription;
  errorAlertType = ALERT_TYPES.danger;
  successAlertType = ALERT_TYPES.success;

  onSubmit() {
    this.errors = '';
    if (!this.accountForm.invalid) {
      if (
        this.dataService.checkAccountName(
          this.accountForm.controls.description.value
        )
      ) {
        this.dataService.addNewAccount({
          name: this.accountForm.controls.description.value,
          balance: this.accountForm.controls.balance.value,
        });
        this.resetForm();
        this.invalid = false;
        this.correctAddition = true;
      } else {
        this.errors = DuplicatedAccountName;
        this.correctAddition = false;
        this.invalid = true;
      }
    } else {
      this.manageErrors();
      this.correctAddition = false;
      this.invalid = true;
    }
  }

  resetForm() {
    this.errors = '';
    this.invalid = true;
    this.accountForm.reset();
  }

  manageErrors() {
    let errorArray = [];
    this.errors = '';
    Object.values(this.accountForm.controls).forEach(
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

  ngOnInit() {
    this.errorSubscription = this.dataService.error.subscribe((msg) => {
      this.errors = msg;
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
export const EmptyError: string = 'Debes rellenar todos los campos.';
export const Title: string = 'Nueva cuenta bancaria';
export const CorrectAdditionMessage = 'Cuenta bancaria registrada con éxito';
export const MinAndEmptyError: string =
  'Debes rellenar todos los campos e incluir una cantidad mayor o igual a cero.';
export const MinError: string =
  'Debes incluir una cantidad mayor o igual a cero.';
export const DuplicatedAccountName: string = 'El nombre elegido ya está en uso';
