import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadersScreenComponent } from './loaders-screen.component';

//! Merge
const components = [LoadersScreenComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class LoadersScreenModule {}
