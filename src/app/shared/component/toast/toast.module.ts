import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';

const components = [ToastComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...components],
  exports: [...components],
})
export class ToastModule {}
