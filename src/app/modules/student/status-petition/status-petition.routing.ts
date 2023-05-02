import { Routes } from '@angular/router';
import { StatusPetitionComponent } from './status-petition.component';
import { StatusPetitionListComponent } from './status-petition-list/status-petition-list.component';

export const statusPetitionRoutes: Routes = [
  {
    path: '',
    component: StatusPetitionComponent,
    children: [
      {
        path: '',
        component: StatusPetitionListComponent,
      },
    ],
  },
];
