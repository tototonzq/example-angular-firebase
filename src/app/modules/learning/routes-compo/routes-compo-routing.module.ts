import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesCompoComponent } from './routes-compo.component';
import { RoutesCompoListComponent } from './routes-compo-list/routes-compo-list.component';
import { RoutesCompoDetailComponent } from './routes-compo-detail/routes-compo-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: RoutesCompoComponent,
    children: [
      {
        path: '',
        component: RoutesCompoListComponent,
        // children: [{ path: 'add', component: RoutesCompoDetailComponent }],
      },
      {
        path: 'add',
        component: RoutesCompoDetailComponent,
      },
    ],
  },
];
