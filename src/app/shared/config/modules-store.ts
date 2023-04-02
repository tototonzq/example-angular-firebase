import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { HeroIconModule, allIcons } from 'ng-heroicon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';

export const imports = [
  BrowserModule,
  AppRoutingModule,
  CommonModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule, // for firestore
  HeroIconModule.withIcons(
    {
      ...allIcons,
    },
    {
      defaultHostDisplay: 'inlineBlock',
    }
  ),
];
