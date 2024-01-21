import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minLength(length: number, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value?.length < length && control.value !== '') {
            const formattedErrorMessage = errorMessage.replace('{{length}}', length.toString());
            return { minLength: true, message: formattedErrorMessage };
        }
        return null;
    }
}