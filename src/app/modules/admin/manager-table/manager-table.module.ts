import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { managerTableRoutes } from './manager-table.routing';
import { ManagerTableComponent } from './manager-table.component';
import { ManagerTableListComponent } from './manager-table-list/manager-table-list.component';
import { LoadersModule } from 'src/app/shared/components/loaders/loaders.module';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './manager-table-list/filter.pipe';

const components = [
  ManagerTableComponent,
  ManagerTableListComponent,
  FilterPipe,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(managerTableRoutes),
    LoadersModule,
    FormsModule,
    ReactiveFormsModule,
    LoadersScreenModule,
  ],
})
export class ManagerTableModule {}
