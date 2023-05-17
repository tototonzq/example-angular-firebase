import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signUpRoutes } from './sign-up.routing';
import { SignUpComponent } from './sign-up.component';
import { SignUpListComponent } from './sign-up-list/sign-up-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';

const components = [SignUpComponent, SignUpListComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild(signUpRoutes),
    ReactiveFormsModule,
    FormsModule,
    LoadersScreenModule,
  ],
})
export class SignUpModule {}
