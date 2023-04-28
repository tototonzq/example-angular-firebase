import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { managerPetitionRoutes } from './manager-petition.routing';
import { RouterModule } from '@angular/router';
import { ManagerPetitionComponent } from './manager-petition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManagerPetitionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(managerPetitionRoutes),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManagerPetitionModule {}
