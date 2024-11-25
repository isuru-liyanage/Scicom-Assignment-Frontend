import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {SharedModules} from '../modules';
import {passwordMismatchValidator} from '../../validators/CustomValidators';
import {HttpClient} from '@angular/common/http';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'app-landing',
  standalone: true,
    imports: [
        SharedModules
    ],
  providers:[ToastService],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  UsernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  isDisabled: boolean =true;
  readonly dialog = inject(MatDialog);

  constructor(private http: HttpClient,private _toastService: ToastService,private router: Router) {
    this.UsernameFormControl.valueChanges.subscribe(() => this.updateButtonState());
    this.passwordFormControl.valueChanges.subscribe(() => this.updateButtonState());
  }
  login(){
    this.http.post("http://localhost:8080/auth_service/auth/login", {"username":this.UsernameFormControl.value,"password":this.passwordFormControl.value},{withCredentials:true}).subscribe(
      {
        next: result => {
          console.log(result);
          this._toastService.success('User logged in successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error:{error?:{error?:string}}) => {
          console.log(error?.error?.error);
          this._toastService.error(<string>error?.error?.error);
        }

      }
    )
    // console.log(this.UsernameFormControl);
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
  styleUrl: './landing.component.css'
})
export class RegisterDialog {
  constructor(private http: HttpClient,private _toastService: ToastService) {
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

  signUp() {
    this.http.post("http://localhost:8080/auth_service/auth/register", {
      "password": this.passwordFormControl.value,
      "displayName": this.displaynameFormControl.value,
      "email": this.emailFormControl.value,
      "username": this.usernameFormControl.value,
    },{withCredentials:true}).subscribe(
      {
        next: result => {
          console.log(result);
          this._toastService.success('User Registered successfully!');
          this._toastService.info('Please Login With Your Credentials');
        },
        error: (error:{error?:{error?:string}}) => {
          console.log(error?.error?.error);
          this._toastService.error(<string>error?.error?.error);
        }

      }
    )
  }
}
