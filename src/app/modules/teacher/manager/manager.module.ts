import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { managerListRoutes } from './manager.routing';
import { ManagerListComponent } from './manager-list/manager-list.component';

const components = [ManagerComponent, ManagerListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(managerListRoutes)],
})
export class ManagerModule {}
