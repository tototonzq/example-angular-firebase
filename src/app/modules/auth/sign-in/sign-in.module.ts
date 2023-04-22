import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signInRoutes } from './sign-in.routing';
import { SignInComponent } from './sign-in.component';
import { SignInListComponent } from './sign-in-list/sign-in-list.component';
import { LoadersModule } from 'src/app/shared/components/loaders/loaders.module';

const components = [SignInComponent, SignInListComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule.forChild(signInRoutes), LoadersModule],
})
export class SignInModule {}
