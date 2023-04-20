import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar.component';

const components = [SidebarComponent];

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [...components],
  exports: [...components],
})
export class SidebarModule {}
