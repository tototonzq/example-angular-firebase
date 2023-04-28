import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatusPetitionComponent } from './status-petition.component';
import { statusPetitionRoutes } from './status-petition.routing';

@NgModule({
  declarations: [StatusPetitionComponent],
  imports: [CommonModule, RouterModule.forChild(statusPetitionRoutes)],
})
export class StatusPetitionModule {}
