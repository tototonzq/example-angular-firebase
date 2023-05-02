import { Routes } from '@angular/router';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{ path: '', component: DashboardListComponent }],
  },
];
