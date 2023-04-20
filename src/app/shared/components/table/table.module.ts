import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [TableComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...components],
  exports: [...components],
})
export class TableModule {}
