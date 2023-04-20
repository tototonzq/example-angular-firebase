import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input.component';
import { RouterModule } from '@angular/router';
import { formInputRoutes } from './form-input.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(formInputRoutes),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FormInputModule {}
