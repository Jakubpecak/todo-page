import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function email(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const test = emailPattern.test(control.value) ? null : { required: true };
        return test && control.value?.length !== 0 ? { required: true, message: errorMessage } : null;
    }
}