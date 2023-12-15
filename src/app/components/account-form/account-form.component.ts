import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';
import { ALERT_TYPES } from '../alert/alert.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent {
  @Input() edit: boolean = false;
  @Input() id: number;
  @Input() open: boolean;

  constructor(private dataService: DataService) {}

  title: string;

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
      if (this.edit) {
        if (this.edit) {
          if (
            this.dataService.checkAccountNameEdit(
              this.dataService.getAccountById(this.id).name,
              this.accountForm.controls.description.value
            )
          ) {
            this.dataService.editAccount({
              id: this.id,
              name: this.accountForm.controls.description.value,
              balance: this.accountForm.controls.balance.value,
            });
            this.invalid = false;
            this.correctAddition = true;
          } else {
            this.errors = DuplicatedAccountName;
            this.correctAddition = false;
            this.invalid = true;
          }
        }
      } else {
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
      }
    } else {
      this.manageErrors();
      this.correctAddition = false;
      this.invalid = true;
    }
  }

  resetForm() {
    this.errors = '';
    this.invalid = false;
    this.correctAddition = false;
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

  fillFields() {
    const account = this.dataService.getAccountById(this.id);
    this.accountForm.controls.description.setValue(account.name);
    this.accountForm.controls.balance.setValue(account.balance);
  }

  ngOnInit() {
    this.title = this.edit ? EditTitle : Title;

    if (this.edit) {
      this.fillFields();
    }

    this.errorSubscription = this.dataService.error.subscribe((msg) => {
      this.errors = msg;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['open'].isFirstChange()) {
      this.resetForm();
      if (this.edit) {
        this.fillFields();
      }
    }
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
export const EditTitle = 'Editar cuenta bancaria';
export const EmptyError: string = 'Debes rellenar todos los campos.';
export const Title: string = 'Nueva cuenta bancaria';
export const CorrectAdditionMessage = 'Cuenta bancaria registrada con éxito';
export const MinAndEmptyError: string =
  'Debes rellenar todos los campos e incluir una cantidad mayor o igual a cero.';
export const MinError: string =
  'Debes incluir una cantidad mayor o igual a cero.';
export const DuplicatedAccountName: string = 'El nombre elegido ya está en uso';
