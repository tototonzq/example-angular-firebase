import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tableRoutes } from './table-data.routing';
import { TableDataComponent } from './table-data.component';
import { TableDataListComponent } from './table-data-list/table-data-list.component';
import { TableModule } from 'src/app/shared/components/table/table.module';

@NgModule({
  declarations: [TableDataComponent, TableDataListComponent],
  imports: [CommonModule, RouterModule.forChild(tableRoutes), TableModule],
})
export class TableDataModule {}
