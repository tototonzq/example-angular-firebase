import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerRoutes } from './manager.routing';
import { ManagerComponent } from './manager.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';

const components = [ManagerComponent, ManagerListComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(ManagerRoutes),
    ReactiveFormsModule,
    FormsModule,
    LoadersScreenModule,
  ],
})
export class ManagerModule {}
