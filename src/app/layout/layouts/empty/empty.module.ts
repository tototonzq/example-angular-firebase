import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { RouterModule } from '@angular/router';

const components = [EmptyComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components],
})
export class EmptyModule {}
