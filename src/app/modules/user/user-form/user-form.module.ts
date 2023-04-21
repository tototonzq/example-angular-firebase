import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { userFormRoutes } from './user-form.routing';

@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, RouterModule.forChild(userFormRoutes)],
})
export class UserFormModule {}
