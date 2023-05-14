import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyManagerComponent } from './company-manager.component';
import { companyRoutes } from './company-manager.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

const components = [FilterPipe, CompanyManagerComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [...components],
})
export class CompanyManagerModule {}
