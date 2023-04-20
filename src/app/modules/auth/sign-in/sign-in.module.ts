import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signInRoutes } from './sign-in.routing';
import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, RouterModule.forChild(signInRoutes)],
})
export class SignInModule {}
