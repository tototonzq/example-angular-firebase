import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar.component';
import { LoadersScreenModule } from 'src/app/shared/components/loaders-screen/loaders-screen.module';

const components = [SidebarComponent];

@NgModule({
  imports: [CommonModule, BrowserModule, LoadersScreenModule],
  declarations: [...components],
  exports: [...components],
})
export class SidebarModule {}
