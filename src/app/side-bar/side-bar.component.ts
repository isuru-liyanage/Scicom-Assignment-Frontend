import { Component } from '@angular/core';
import {SharedModules} from '../modules';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SharedModules, MatSidenavContainer, MatToolbar, MatNavList, MatIcon, MatListItem, MatSidenav],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
