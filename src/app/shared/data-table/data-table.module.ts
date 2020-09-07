import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataTableFiltersComponent } from './data-table-filters/data-table-filters.component';
import { SharedModule } from '@shared/components/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [DataTableComponent, DataTableFiltersComponent],
  exports: [
    DataTableComponent,
    DataTableFiltersComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatProgressBarModule,
  ],
})
export class DataTableModule { }
