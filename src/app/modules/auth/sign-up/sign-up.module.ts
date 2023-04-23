import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signUpRoutes } from './sign-up.routing';
import { SignUpComponent } from './sign-up.component';
import { SignUpListComponent } from './sign-up-list/sign-up-list.component';

const components = [SignUpComponent, SignUpListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(signUpRoutes)],
})
export class SignUpModule {}
