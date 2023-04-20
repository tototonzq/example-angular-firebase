import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyModule } from './layouts/empty/empty.module';
import { LayoutComponent } from './layout.component';
import { VerticalModule } from './layouts/modern/vertical/vertical.module';

//* Layouts modules
const modules = [VerticalModule, EmptyModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ...modules],
  exports: [LayoutComponent],
})
export class LayoutModule {}
