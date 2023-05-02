import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetitionTableComponent } from './petition-table.component';
import { petitionTableRoutes } from './petition-table.routing';

const components = [PetitionTableComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(petitionTableRoutes)],
})
export class PetitionTableModule {}
