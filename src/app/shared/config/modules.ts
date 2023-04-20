import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeroIconModule, allIcons } from 'ng-heroicon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
import { SidebarModule } from '../component/sidebar/sidebar.module';
import { TableModule } from '../component/table/table.module';
import { FormModule } from '../component/form/form.module';
import { RouterModule } from '@angular/router';

const componentModule = [SidebarModule, TableModule, FormModule];

const firebaseModule = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule, // For Firestore
];

const commonModule = [
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  // BrowserModule,
  AppRoutingModule,
  CommonModule,
  HeroIconModule.withIcons(
    {
      ...allIcons,
    },
    {
      defaultHostDisplay: 'inlineBlock',
    }
  ),
];

export const imports = [...firebaseModule, ...componentModule, ...commonModule];
