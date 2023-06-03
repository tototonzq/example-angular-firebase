import { Routes } from '@angular/router';
import { ManagerPetitionListComponent } from './manager-petition-list/manager-petition-list.component';
import { ManagerPetitionComponent } from './manager-petition.component';
import { ManagerPetitionSettingComponent } from './manager-petition-setting/manager-petition-setting.component';
import { PetitionTableDetailComponent } from '../../student/petition-table/petition-table-detail/petition-table-detail.component';

export const managerPetitionRoutes: Routes = [
  {
    path: '',
    component: ManagerPetitionComponent,
    children: [
      {
        path: '',
        component: ManagerPetitionListComponent,
      },
      {
        path: 'setting-petition',
        component: ManagerPetitionSettingComponent,
      },
      { path: 'detail', component: PetitionTableDetailComponent },
    ],
  },
];
