import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minLength(length: number, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value?.length < length && control.value !== '') {
            return { minLength: { value: true, length: length, message: errorMessage } };
        }
        return null;
    }
}