import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {SideBarComponent} from './side-bar/side-bar.component';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatCheckbox} from '@angular/material/checkbox';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {AngularToastifyModule} from 'angular-toastify';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatCardModule,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatCheckbox,
    AngularToastifyModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDivider, MatButton,MatDialogModule, MatButtonModule,MatTable, MatOption, MatSelect, MatHeaderCell, MatCell, MatIcon, MatHeaderRow, MatRow, MatColumnDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef
  ],
  exports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    RouterModule,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatCheckbox,
    AngularToastifyModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDivider, MatButton,MatDialogModule, MatButtonModule,MatTable, MatOption, MatSelect, MatHeaderCell, MatCell, MatIcon, MatHeaderRow, MatRow, MatColumnDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef
  ],
})
export class SharedModules {}
