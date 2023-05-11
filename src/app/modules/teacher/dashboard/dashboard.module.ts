import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { LoadersModule } from 'src/app/shared/components/loaders/loaders.module';

/* -------------------------------------------------------------------------- */
//*                                 components                                 */
/* -------------------------------------------------------------------------- */
const components = [DashboardComponent, DashboardListComponent];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    LoadersModule,
  ],
})
export class DashboardModule {}
