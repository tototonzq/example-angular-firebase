import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetitionTableComponent } from './petition-table.component';
import { petitionTableRoutes } from './petition-table.routing';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [PetitionTableComponent, FilterPipe];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(petitionTableRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PetitionTableModule {}
