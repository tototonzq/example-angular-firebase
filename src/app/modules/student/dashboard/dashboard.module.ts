import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routing';

const components = [DashboardComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
})
export class DashboardModule {}
