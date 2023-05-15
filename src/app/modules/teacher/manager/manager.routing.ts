import { Routes } from '@angular/router';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { ManagerComponent } from './manager.component';
import { ManagerDetailComponent } from './manager-detail/manager-detail.component';

export const managerListRoutes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', component: ManagerListComponent },
      { path: 'detail', component: ManagerDetailComponent },
    ],
  },
];
