import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { components } from './shared/config/components-store';
import { imports } from './shared/config/modules-store';

@NgModule({
  declarations: [...components],
  imports: [...imports],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
