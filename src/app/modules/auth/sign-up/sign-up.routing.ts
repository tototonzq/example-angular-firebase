import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { SignUpListComponent } from './sign-up-list/sign-up-list.component';

export const signUpRoutes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    children: [{ path: '', component: SignUpListComponent }],
  },
];
