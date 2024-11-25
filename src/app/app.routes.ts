import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LandingComponent} from './landing/landing.component';
import {AddItemComponent} from './add-item/add-item.component';
import {ChangeCredentialsComponent} from './change-credentials/change-credentials.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {path:'dashboard',component: DashboardComponent},
  {path:'add_item',component: AddItemComponent},
  {path:'change_pw',component:ChangeCredentialsComponent}
];
