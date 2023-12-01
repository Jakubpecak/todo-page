import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function required(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === '' || control.value == null ? { required: true, message: errorMessage } : null;
  };
}