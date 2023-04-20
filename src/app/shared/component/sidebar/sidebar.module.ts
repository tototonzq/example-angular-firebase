import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { allIcons, HeroIconModule } from 'ng-heroicon';
import { SidebarComponent } from './sidebar.component';

const components = [SidebarComponent];

@NgModule({
  imports: [
    BrowserModule,
    HeroIconModule.withIcons(
      {
        ...allIcons,
      },
      {
        defaultHostDisplay: 'inlineBlock',
      }
    ),
  ],
  declarations: [...components],
  exports: [...components],
})
export class SidebarModule {}
