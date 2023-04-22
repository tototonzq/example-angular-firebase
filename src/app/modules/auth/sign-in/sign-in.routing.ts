import { Route } from '@angular/router';
import { SignInListComponent } from './sign-in-list/sign-in-list.component';
import { SignInComponent } from './sign-in.component';

export const signInRoutes: Route[] = [
  {
    path: '',
    component: SignInComponent,
    children: [{ path: '', component: SignInListComponent }],
  },
];
