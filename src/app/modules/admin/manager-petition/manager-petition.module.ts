import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerPetitionComponent } from './manager-petition.component';
import { RouterModule } from '@angular/router';
import { managerPetitionRoutes } from './manager-petition.routing';
import { ManagerPetitionListComponent } from './manager-petition-list/manager-petition-list.component';
import { ManagerPetitionSettingComponent } from './manager-petition-setting/manager-petition-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  ManagerPetitionComponent,
  ManagerPetitionListComponent,
  ManagerPetitionSettingComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(managerPetitionRoutes),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManagerPetitionModule {}
