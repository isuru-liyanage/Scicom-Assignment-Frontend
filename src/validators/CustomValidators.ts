import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMismatchValidator(passwordControl: AbstractControl): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!passwordControl) {
      return null;
    }

    return control.value !== passwordControl.value
      ? { passwordMismatch: true }
      : null;
  };
}
