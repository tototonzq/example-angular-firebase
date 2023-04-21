import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './layout/layout.module';
import { routes } from './app.routing';
import { NgxsModule } from '@ngxs/store';
import { Stores } from './stores';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { UserFormComponent } from './modules/user/user-form/user-form.component';

const components = [AppComponent];

const firebases = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    LayoutModule,
    NgxsModule.forRoot(Stores),
    firebases,
  ],
  bootstrap: [...components],
})
export class AppModule {}
