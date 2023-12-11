import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { DataService } from 'src/app/services/data/data.service';
import { EmptyValidator } from 'src/app/validators/empty-validator';
import { ALERT_TYPES } from '../alert/alert.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-budget-category-form',
  templateUrl: './budget-category-form.component.html',
  styleUrls: ['./budget-category-form.component.css'],
})
export class BudgetCategoryFormComponent {
  constructor(private dataService: DataService) {}
  @Input() edit: boolean = false;
  @Input() category: BudgetCategory;
  @Input() categoryName: string;
  @Input() open: boolean;

  title: string;

  categoryForm = new FormGroup({
    description: new FormControl<string>(null, [EmptyValidator]),
    max: new FormControl<number>(null, [EmptyValidator, Validators.min(1)]),
    color: new FormControl(null, [EmptyValidator]),
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
    if (!this.categoryForm.invalid) {
      if (this.edit) {
        if (
          this.dataService.checkCategoryNameEdit(
            this.category.name,
            this.categoryForm.controls.description.value
          )
        ) {
          this.dataService.editCategory(
            {
              id: this.category.id,
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
          this.errors = DuplicatedCategoryName;
          this.correctAddition = false;
          this.invalid = true;
        }
      } else {
        if (
          this.dataService.checkCategoryName(
            this.categoryForm.controls.description.value
          )
        ) {
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
          this.errors = DuplicatedCategoryName;
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

  ngOnInit() {
    this.errorSubscription = this.dataService.error.subscribe((msg) => {
      this.errors = msg;
    });
    this.title = this.edit ? EditTitle : Title;

    if (this.edit) {
      this.fillFields();
    }
  }

  fillFields() {
    this.categoryName = this.dataService.getCategoryTypeByName(
      this.category.name
    );
    this.categoryForm.controls.description.setValue(this.category.name);
    this.categoryForm.controls.max.setValue(this.category.max);
    this.categoryForm.controls.color.setValue(this.category.color);
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
export const EmptyError: string = 'Debes rellenar todos los campos.';
export const Title: string = 'Nueva categoría';
export const EditTitle: string = 'Editar categoría';
export const CorrectAdditionMessage = 'Categoría registrada con éxito';
export const MinAndEmptyError: string =
  'Debes rellenar todos los campos e incluir una cantidad mayor que cero.';
export const MinError: string = 'Debes incluir una cantidad mayor que cero.';
export const DuplicatedCategoryName: string =
  'El nombre elegido ya está en uso';
