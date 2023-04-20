import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

const components = [NavbarComponent];

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [...components],
  exports: [...components],
})
export class NavbarModule {}
