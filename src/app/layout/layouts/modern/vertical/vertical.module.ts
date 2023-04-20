import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VerticalComponent } from './vertical.component';
import { SidebarModule } from 'src/app/layout/common/sidebar/sidebar.module';
import { NavbarModule } from 'src/app/layout/common/navbar/navbar.module';

//* Layout Components
const components = [VerticalComponent];

//* Modules Shared
const shared = [SidebarModule, NavbarModule];

//* Modules
const modules = [CommonModule, RouterModule];

@NgModule({
  declarations: [...components],
  imports: [...shared, ...modules],
  exports: [...components],
})
export class VerticalModule {}
