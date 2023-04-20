import { Routes, RouterModule } from '@angular/router';
import { TableDataComponent } from './table-data.component';
import { TableDataListComponent } from './table-data-list/table-data-list.component';

export const tableRoutes: Routes = [
  {
    path: '',
    component: TableDataComponent,
    children: [{ path: '', component: TableDataListComponent }],
  },
];
