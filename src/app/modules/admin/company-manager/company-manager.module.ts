import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyManagerComponent } from './company-manager.component';
import { RouterModule } from '@angular/router';
import { companyRoutes } from './company-manager.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes),
    FormsModule,
    ReactiveFormsModule,
    LoadersScreenModule,
  ],
  declarations: [CompanyManagerComponent, FilterPipe],
})
export class CompanyManagerModule {}
