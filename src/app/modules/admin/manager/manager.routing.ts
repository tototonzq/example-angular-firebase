import { Routes } from '@angular/router';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { ManagerComponent } from './manager.component';

export const ManagerRoutes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [{ path: '', component: ManagerListComponent }],
  },
];
