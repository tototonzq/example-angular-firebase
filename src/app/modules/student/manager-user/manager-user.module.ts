import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerUserComponent } from './manager-user.component';
import { RouterModule } from '@angular/router';
import { managerUserRoutes } from './manager-user.routing';

@NgModule({
  declarations: [ManagerUserComponent],
  imports: [CommonModule, RouterModule.forChild(managerUserRoutes)],
})
export class ManagerUserModule {}
