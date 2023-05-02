import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatusPetitionComponent } from './status-petition.component';
import { statusPetitionRoutes } from './status-petition.routing';
import { StatusPetitionListComponent } from './status-petition-list/status-petition-list.component';

const components = [StatusPetitionComponent, StatusPetitionListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(statusPetitionRoutes)],
})
export class StatusPetitionModule {}
