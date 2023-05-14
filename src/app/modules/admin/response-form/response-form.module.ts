import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseFormComponent } from './response-form.component';
import { RouterModule } from '@angular/router';
import { ResponseRoutes } from './response-form.routing';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ResponseRoutes),
    LoadersScreenModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ResponseFormComponent, FilterPipe],
})
export class ResponseFormModule {}
