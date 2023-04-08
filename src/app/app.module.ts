import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { components } from './shared/config/components';
import { imports } from './shared/config/modules';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [	...components,
      LayoutComponent
   ],
  imports: [...imports],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
