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




}

