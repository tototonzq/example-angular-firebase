import { Routes } from '@angular/router';
import { ManagerTableComponent } from './manager-table.component';
import { ManagerTableListComponent } from './manager-table-list/manager-table-list.component';

export const managerTableRoutes: Routes = [
  {
    path: '',
    component: ManagerTableComponent,
    children: [{ path: '', component: ManagerTableListComponent }],
  },
];
