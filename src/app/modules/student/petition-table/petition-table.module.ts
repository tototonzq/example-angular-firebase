import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetitionTableComponent } from './petition-table.component';
import { petitionTableRoutes } from './petition-table.routing';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetitionTableDetailComponent } from './petition-table-detail/petition-table-detail.component';
import { PetitionTableListComponent } from './petition-table-list/petition-table-list.component';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';

const components = [
  PetitionTableComponent,
  FilterPipe,
  PetitionTableDetailComponent,
  PetitionTableListComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(petitionTableRoutes),
    FormsModule,
    ReactiveFormsModule,
    LoadersScreenModule,
  ],
})
export class PetitionTableModule {}
