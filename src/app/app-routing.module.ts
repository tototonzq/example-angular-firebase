import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { AddDataComponent } from './modules/user/add-data/add-data.component';
import { CardComponent } from './modules/user/card/card.component';
import { DashboardComponent } from './modules/user/dashboard/dashboard.component';
import { ShowDataComponent } from './modules/user/show-data/show-data.component';

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
  },
  {
    path: 'show-data',
    component: ShowDataComponent,
  },
  {
    path: 'add-data',
    component: AddDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
