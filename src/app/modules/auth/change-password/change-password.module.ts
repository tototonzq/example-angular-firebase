import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { changePasswordRoutes } from './change-password.routing';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordListComponent } from './change-password-list/change-password-list.component';

const components = [ChangePasswordComponent, ChangePasswordListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(changePasswordRoutes)],
})
export class ChangePasswordModule {}
