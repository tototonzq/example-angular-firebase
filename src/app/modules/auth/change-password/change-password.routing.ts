import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordListComponent } from './change-password-list/change-password-list.component';

export const changePasswordRoutes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    children: [{ path: '', component: ChangePasswordListComponent }],
  },
];
