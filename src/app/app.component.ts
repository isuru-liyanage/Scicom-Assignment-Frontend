import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SharedModules} from './modules';
import { MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { passwordMismatchValidator} from '../validators/CustomValidators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModules, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  UsernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  isDisabled: boolean =true;
  readonly dialog = inject(MatDialog);

  constructor() {
    this.UsernameFormControl.valueChanges.subscribe(() => this.updateButtonState());
    this.passwordFormControl.valueChanges.subscribe(() => this.updateButtonState());
  }
  login(){

    console.log(this.UsernameFormControl);
  }
  updateButtonState() {
    this.isDisabled = this.UsernameFormControl.invalid || this.passwordFormControl.invalid;
  }
  openregister(){
    console.log('open register');
    const dialogRef = this.dialog.open(RegisterDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'register-content-dialog',
  templateUrl: 'registerdialog.html',
  standalone: true,
  imports: [SharedModules, ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.component.css'
})
export class RegisterDialog {
  constructor() {
    this.confirmPasswordFormControl.valueChanges.subscribe(() => this.showregister());

  }
  usernameFormControl = new FormControl('', [Validators.required]);
  displaynameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordFormControl = new FormControl('', [Validators.required, passwordMismatchValidator(this.passwordFormControl)]);
  isDisabled=true;

  private showregister() {
    this.isDisabled = this.emailFormControl.invalid || this.passwordFormControl.invalid || this.confirmPasswordFormControl.invalid;
    console.log(this.confirmPasswordFormControl);
  }
}
