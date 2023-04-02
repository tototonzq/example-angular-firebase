import { AppComponent } from 'src/app/app.component';
import { SignInComponent } from 'src/app/modules/auth/sign-in/sign-in.component';
import { AddDataComponent } from 'src/app/modules/user/add-data/add-data.component';
import { CardComponent } from 'src/app/modules/user/card/card.component';
import { DashboardComponent } from 'src/app/modules/user/dashboard/dashboard.component';
import { ShowDataComponent } from 'src/app/modules/user/show-data/show-data.component';

export const components = [
  AppComponent,
  DashboardComponent,
  SignInComponent,
  CardComponent,
  ShowDataComponent,
  AddDataComponent,
];
