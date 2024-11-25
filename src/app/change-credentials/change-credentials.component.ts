import { Component } from '@angular/core';
import {AngularToastifyModule} from 'angular-toastify';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {SideBarComponent} from '../side-bar/side-bar.component';

@Component({
  selector: 'app-change-credentials',
  standalone: true,
  imports: [
    AngularToastifyModule,
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    NgForOf,
    SideBarComponent
  ],
  templateUrl: './change-credentials.component.html',
  styleUrl: './change-credentials.component.css'
})
export class ChangeCredentialsComponent {

}
