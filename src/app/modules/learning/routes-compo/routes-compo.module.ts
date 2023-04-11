import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { RoutesCompoRoutingModule } from './routes-compo-routing.module';
import { RoutesCompoComponent } from './routes-compo.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutesCompoListComponent } from './routes-compo-list/routes-compo-list.component';
import { RoutesCompoDetailComponent } from './routes-compo-detail/routes-compo-detail.component';
import { routes } from './routes-compo-routing.module';

const components = [
  RoutesCompoComponent,
  RoutesCompoListComponent,
  RoutesCompoDetailComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
})
export class RoutesCompoModule {}
