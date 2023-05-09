import { Routes } from '@angular/router';
import { ManagerPetitionListComponent } from './manager-petition-list/manager-petition-list.component';
import { ManagerPetitionComponent } from './manager-petition.component';
import { ManagerPetitionSettingComponent } from './manager-petition-setting/manager-petition-setting.component';

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
    ],
  },
];
