import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function password(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{3,}$/;
        const test = pattern.test(control.value) ? null : { required: true };
        return test && control.value.length !== 0 ? { required: true, message: errorMessage } : null;
    }
}