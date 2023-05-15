import { Routes, RouterModule } from '@angular/router';
import { PetitionTableComponent } from './petition-table.component';
import { PetitionTableDetailComponent } from './petition-table-detail/petition-table-detail.component';
import { PetitionTableListComponent } from './petition-table-list/petition-table-list.component';

export const petitionTableRoutes: Routes = [
  {
    path: '',
    component: PetitionTableComponent,
    children: [
      { path: '', component: PetitionTableListComponent },
      { path: 'detail', component: PetitionTableDetailComponent },
    ],
  },
];
