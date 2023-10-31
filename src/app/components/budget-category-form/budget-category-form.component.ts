import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { DataService } from 'src/app/services/data.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';
import { ALERT_TYPES } from '../alert/alert.component';
@Component({
  selector: 'app-budget-category-form',
  templateUrl: './budget-category-form.component.html',
  styleUrls: ['./budget-category-form.component.css'],
})
export class BudgetCategoryFormComponent {
  constructor(private dataService: DataService) {}

  @Input() categoryName: string;

  title = Title;

  categoryForm = new FormGroup({
    description: new FormControl<string>(null, [EmptyValidator]),
    max: new FormControl<number>(null, [EmptyValidator, Validators.min(1)]),
    color: new FormControl(null, [EmptyValidator]),
  });

  invalid = false;

  correctAddition = false;
  correctAdditionMessage = CorrectAdditionMessage;

  errors = '';
  errorAlertType = ALERT_TYPES.danger;
  successAlertType = ALERT_TYPES.success;

  onSubmit() {
    this.errors = '';
    if (!this.categoryForm.invalid) {
      this.dataService.addNewCategory(
        {
          name: this.categoryForm.controls.description.value,
          max: this.categoryForm.controls.max.value,
          color: this.categoryForm.controls.color.value,
        },
        this.categoryName
      );
      this.resetForm();
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
    this.invalid = true;
    this.categoryForm.reset();
  }

  manageErrors() {
    let errorArray = [];
    this.errors = '';
    Object.values(this.categoryForm.controls).forEach(
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
export const EmptyError: string = 'Debes rellenar todos los campos.';
export const Title: string = 'Nueva categoría';
export const CorrectAdditionMessage = 'Categoría registrada con éxito';
export const MinAndEmptyError: string =
  'Debes rellenar todos los campos e incluir una cantidad mayor que cero.';
export const MinError: string = 'Debes incluir una cantidad mayor que cero.';
