import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function required(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === '' || control.value == null) {
      return { required: true, message: errorMessage };
    }
    return null;
  };
}