import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { managerTableRoutes } from './manager-table.routing';
import { ManagerTableComponent } from './manager-table.component';
import { ManagerTableListComponent } from './manager-table-list/manager-table-list.component';

const components = [ManagerTableComponent, ManagerTableListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(managerTableRoutes)],
})
export class ManagerTableModule {}
