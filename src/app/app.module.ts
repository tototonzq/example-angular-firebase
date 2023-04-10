import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { components } from './shared/config/components';
import { imports } from './shared/config/modules';

@NgModule({
  declarations: [...components],
  imports: [...imports],
  bootstrap: [AppComponent],
})
export class AppModule {}
