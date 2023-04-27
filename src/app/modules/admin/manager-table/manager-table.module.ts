import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { managerTableRoutes } from './manager-table.routing';
import { ManagerTableComponent } from './manager-table.component';
import { ManagerTableListComponent } from './manager-table-list/manager-table-list.component';
import { LoadersModule } from 'src/app/shared/components/loaders/loaders.module';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';

const components = [ManagerTableComponent, ManagerTableListComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(managerTableRoutes),
    LoadersModule,
    LoadersScreenModule
  ],
})
export class ManagerTableModule {}
