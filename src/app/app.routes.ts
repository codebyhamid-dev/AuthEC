import { Routes } from '@angular/router';
import { RegisterComponent } from './User/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
];
