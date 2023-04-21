import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Route[] = [
  // Redirect empty path to '/dashboards/project'
  //TODO: This project user better comments
  /**
   * * Green
   * ! Red
   * ? Blue
   * TODO: Orange
   */

  //* Welcome page
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },

  //* Auth first routes for users that are signed in
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },

  //* Auth routes for users that are signed in
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./modules/auth/sign-in/sign-in.module').then(
            (m) => m.SignInModule
          ),
      },
    ],
  },

  //* User routes for users that are signed in
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
      role: 'user',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/user/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'routes-compo',
        loadChildren: () =>
          import('./modules/user/routes-compo/routes-compo.module').then(
            (m) => m.RoutesCompoModule
          ),
      },
      {
        path: 'form-input',
        loadChildren: () =>
          import('./modules/user/form-input/form-input.module').then(
            (m) => m.FormInputModule
          ),
      },
      {
        path: 'card',
        loadChildren: () =>
          import('./modules/user/card/card.module').then((m) => m.CardModule),
      },
      {
        path: 'table-data',
        loadChildren: () =>
          import('./modules/user/table-data/table-data.module').then(
            (m) => m.TableDataModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/user/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'manager-user',
        loadChildren: () =>
          import('./modules/user/manager-user/manager-user.module').then(
            (m) => m.ManagerUserModule
          ),
      },
      {
        path: 'user-form',
        loadChildren: () =>
          import('./modules/user/user-form/user-form.module').then(
            (m) => m.UserFormModule
          ),
      },
    ],
  },

  //* Admin routes for users that are signed in
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
      role: 'admin',
    },
    children: [
      {
        path: 'ad-dashboard',
        loadChildren: () =>
          import('./modules/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'manager',
        loadChildren: () =>
          import('./modules/admin/manager/manager.module').then(
            (m) => m.ManagerModule
          ),
      },
      {
        path: 'status-petition',
        loadChildren: () =>
          import('./modules/user/status-petition/status-petition.module').then(
            (m) => m.StatusPetitionModule
          ),
      },
      {
        path: 'manager-petition',
        loadChildren: () =>
          import(
            './modules/admin/manager-petition/manager-petition.module'
          ).then((m) => m.ManagerPetitionModule),
      },
    ],
  },

  //* Admin routes for users that are signed in
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
      role: 'teacher',
    },
    children: [
      {
        path: 't-manager',
        loadChildren: () =>
          import('./modules/teacher/manager/manager.module').then(
            (m) => m.ManagerModule
          ),
      },
      {
        path: 't-dashboard',
        loadChildren: () =>
          import('./modules/teacher/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },

  //! not found pages
  { path: '**', redirectTo: '404-not-found' },
];
