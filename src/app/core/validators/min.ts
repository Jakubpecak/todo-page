import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minLength(length: number, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value?.length < length && control.value?.length !== 0 ? { required: true, message: errorMessage } : null;
    }
}