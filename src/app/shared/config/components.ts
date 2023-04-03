import { AppComponent } from 'src/app/app.component';
import { SignInComponent } from 'src/app/modules/auth/sign-in/sign-in.component';
import { AddDataComponent } from 'src/app/modules/user/add-data/add-data.component';
import { CardDetailComponent } from 'src/app/modules/user/card/card-detail/card-detail.component';
import { CardListComponent } from 'src/app/modules/user/card/card-list/card-list.component';
import { CardComponent } from 'src/app/modules/user/card/card.component';
import { DashboardComponent } from 'src/app/modules/user/dashboard/dashboard.component';
import { CostFormComponent } from 'src/app/modules/user/form-project/cost-form/cost-form.component';
import { FormProjectComponent } from 'src/app/modules/user/form-project/form-project.component';
import { GeneralFormComponent } from 'src/app/modules/user/form-project/general-form/general-form.component';
import { SummaryFormComponent } from 'src/app/modules/user/form-project/summary-form/summary-form.component';
import { ShowDataComponent } from 'src/app/modules/user/show-data/show-data.component';

export const components = [
  AppComponent,
  DashboardComponent,
  SignInComponent,
  CardComponent,
  ShowDataComponent,
  AddDataComponent,
  CardListComponent,
  CardDetailComponent,
  FormProjectComponent,
  GeneralFormComponent,
  CostFormComponent,
  SummaryFormComponent,
];
