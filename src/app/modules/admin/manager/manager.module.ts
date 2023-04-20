import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerRoutes } from './manager.routing';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, RouterModule.forChild(ManagerRoutes)],
})
export class ManagerModule {}
