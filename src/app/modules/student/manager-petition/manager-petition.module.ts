import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { managerPetitionRoutes } from './manager-petition.routing';
import { RouterModule } from '@angular/router';
import { ManagerPetitionComponent } from './manager-petition.component';

@NgModule({
  declarations: [ManagerPetitionComponent],
  imports: [CommonModule, RouterModule.forChild(managerPetitionRoutes)],
})
export class ManagerPetitionModule {}
