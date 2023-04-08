import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeroIconModule, allIcons } from 'ng-heroicon';
import { ReactiveFormsModule } from '@angular/forms';

const components = [FormComponent];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
export class FormModule {}
