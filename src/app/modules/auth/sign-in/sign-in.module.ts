import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signInRoutes } from './sign-in.routing';
import { SignInComponent } from './sign-in.component';
import { SignInListComponent } from './sign-in-list/sign-in-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';
import { LoadersModule } from 'src/app/shared/components/loaders/loaders.module';

const components = [SignInComponent, SignInListComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(signInRoutes),
    LoadersScreenModule,
    ReactiveFormsModule,
    FormsModule,
    LoadersModule
  ],
})
export class SignInModule {}
