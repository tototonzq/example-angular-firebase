import { Routes } from '@angular/router';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { ManagerComponent } from './manager.component';

// Route

export const ManagerRoutes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [{ path: '', component: ManagerListComponent }],
  },
];
