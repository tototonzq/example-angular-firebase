import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { managerListRoutes } from './manager.routing';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { FilterPipe } from './manager-list/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';
import { ManagerDetailComponent } from './manager-detail/manager-detail.component';

const components = [
  ManagerComponent,
  ManagerListComponent,
  FilterPipe,
  ManagerDetailComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(managerListRoutes),
    FormsModule,
    ReactiveFormsModule,
    LoadersScreenModule,
  ],
})
export class ManagerModule {}
