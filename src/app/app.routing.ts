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
  // { path: '', pathMatch: 'full', redirectTo: 'welcome' },

  //* Auth first routes for users that are signed in
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },

  /* -------------------------------------------------------------------------- */
  //*                                    Auth                                    */
  /* -------------------------------------------------------------------------- */
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
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./modules/auth/sign-up/sign-up.module').then(
            (m) => m.SignUpModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./modules/auth/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  //*                                   Student                                  */
  /* -------------------------------------------------------------------------- */
  //* Student routes for users that are signed in
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
      role: 'student',
    },
    children: [
      {
        path: 'student-dashboard',
        loadChildren: () =>
          import('./modules/student/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'student-status-petition',
        loadChildren: () =>
          import(
            './modules/student/status-petition/status-petition.module'
          ).then((m) => m.StatusPetitionModule),
      },
      {
        path: 'student-petition-table',
        loadChildren: () =>
          import('./modules/student/petition-table/petition-table.module').then(
            (m) => m.PetitionTableModule
          ),
      },
      {
        path: 'student-manager-petition',
        loadChildren: () =>
          import(
            './modules/student/manager-petition/manager-petition.module'
          ).then((m) => m.ManagerPetitionModule),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },

  /* -------------------------------------------------------------------------- */
  //*                                    Admin                                   */
  /* -------------------------------------------------------------------------- */
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
        path: 'admin-dashboard',
        loadChildren: () =>
          import('./modules/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'admin-manager',
        loadChildren: () =>
          import('./modules/admin/manager/manager.module').then(
            (m) => m.ManagerModule
          ),
      },
      {
        path: 'admin-manager-table',
        loadChildren: () =>
          import('./modules/admin/manager-table/manager-table.module').then(
            (m) => m.ManagerTableModule
          ),
      },
      {
        path: 'status-petition',
        loadChildren: () =>
          import(
            './modules/student/status-petition/status-petition.module'
          ).then((m) => m.StatusPetitionModule),
      },
      {
        path: 'manager-petition',
        loadChildren: () =>
          import(
            './modules/admin/manager-petition/manager-petition.module'
          ).then((m) => m.ManagerPetitionModule),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },

  /* -------------------------------------------------------------------------- */
  //*                                   Teacher                                  */
  /* -------------------------------------------------------------------------- */
  //* Teacher routes for users that are signed in
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
      role: 'teacher',
    },
    children: [
      {
        path: 'teacher-dashboard',
        loadChildren: () =>
          import('./modules/teacher/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 't-manager',
        loadChildren: () =>
          import('./modules/teacher/manager/manager.module').then(
            (m) => m.ManagerModule
          ),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },

  /* -------------------------------------------------------------------------- */
  //*                                Global Routes                               */
  /* -------------------------------------------------------------------------- */
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: '404-not-found',
        loadChildren: () =>
          import('./modules/error/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },
  { path: '**', redirectTo: '404-not-found' },
];
