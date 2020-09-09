import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListEditorComponent } from './list-editor/list-editor.component';
import { SharedModule } from '@shared/components/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ListsComponent, ListSelectorComponent, ListEditorComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatSidenavModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    DragDropModule,
  ],
})
export class ListsModule { }
