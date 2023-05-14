import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { LoadersModule } from 'src/app/shared/components/loaders/loaders.module';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, DashboardListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    LoadersModule,
    FormsModule,
    ReactiveFormsModule,
    LoadersScreenModule,
  ],
})
export class DashboardModule {}
