import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDivider, MatButton,MatDialogModule, MatButtonModule
  ],
  exports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDivider, MatButton,MatDialogModule, MatButtonModule
  ],
})
export class SharedModules {}
