import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minLength(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value.length < 3 && control.value.length !== 0) {
            return { required: true, message: errorMessage }
        }
        return null;
    }
}