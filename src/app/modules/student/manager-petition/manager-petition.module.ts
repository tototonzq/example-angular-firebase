import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { managerPetitionRoutes } from './manager-petition.routing';
import { RouterModule } from '@angular/router';
import { ManagerPetitionComponent } from './manager-petition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';

@NgModule({
  declarations: [ManagerPetitionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(managerPetitionRoutes),
    ReactiveFormsModule,
    FormsModule,
    LoadersScreenModule,
  ],
})
export class ManagerPetitionModule {}
