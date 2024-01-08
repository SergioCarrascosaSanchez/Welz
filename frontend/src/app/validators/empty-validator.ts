import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function EmptyValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value === null || control.value === '') {
    return { emptyValue: true };
  }
  return null;
}
