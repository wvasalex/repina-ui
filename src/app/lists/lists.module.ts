import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DataTableModule } from '@shared/data-table/data-table.module';
import { ListEditorComponent } from './list-editor/list-editor.component';
import { SharedModule } from '@shared/components/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [ListsComponent, ListSelectorComponent, ListEditorComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatSidenavModule,
    DataTableModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
  ],
})
export class ListsModule { }
