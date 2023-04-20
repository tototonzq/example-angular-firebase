import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerPetitionComponent } from './manager-petition.component';
import { RouterModule } from '@angular/router';
import { managerPetitionRoutes } from './manager-petition.routing';

@NgModule({
  declarations: [ManagerPetitionComponent],
  imports: [CommonModule, RouterModule.forChild(managerPetitionRoutes)],
})
export class ManagerPetitionModule {}
