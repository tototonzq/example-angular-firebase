import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { managerListRoutes } from './manager.routing';

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, RouterModule.forChild(managerListRoutes)],
})
export class ManagerModule {}
