import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableComponent } from './table.component';

const components = [TableComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class TableModule {}
