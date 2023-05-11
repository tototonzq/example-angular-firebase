import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { managerListRoutes } from './manager.routing';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { FilterPipe } from './manager-list/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [ManagerComponent, ManagerListComponent, FilterPipe];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(managerListRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ManagerModule {}
