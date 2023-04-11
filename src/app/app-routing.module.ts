import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { AddDataComponent } from './modules/user/add-data/add-data.component';
import { CardComponent } from './modules/user/card/card.component';
import { DashboardComponent } from './modules/user/dashboard/dashboard.component';
import { ShowDataComponent } from './modules/user/show-data/show-data.component';
import { CardListComponent } from './modules/user/card/card-list/card-list.component';
import { CardDetailComponent } from './modules/user/card/card-detail/card-detail.component';
import { FormProjectComponent } from './modules/user/form-project/form-project.component';
import { FormInputComponent } from './modules/user/form-input/form-input.component';
import { InputReComponent } from './modules/user/input-re/input-re.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'card',
    component: CardComponent,
    children: [
      {
        path: '',
        component: CardListComponent,
        children: [{ path: ':id', component: CardDetailComponent }],
      },
    ],
  },
  {
    path: 'show-data',
    component: ShowDataComponent,
  },
  {
    path: 'add-data',
    component: AddDataComponent,
  },
  {
    path: 'reactive-forms',
    component: FormProjectComponent,
  },
  {
    path: 'form-input',
    component: FormInputComponent,
  },
  {
    path: 'input-re',
    component: InputReComponent,
  },
  {
    path: 'routes-compo',
    loadChildren: () =>
      import('./modules/learning/routes-compo/routes-compo.module').then(
        (m) => m.RoutesCompoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
