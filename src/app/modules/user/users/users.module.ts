import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, RouterModule.forChild(UsersRoutes)],
})
export class UsersModule {}
