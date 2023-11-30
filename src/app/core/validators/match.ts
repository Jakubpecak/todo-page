import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(getPassword: () => string, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null  => {
        const currentPassword = getPassword();
        if (control.value !== currentPassword && control.value !== '') {
            return { required: true, message: errorMessage }
        }
        return null;
    }
}