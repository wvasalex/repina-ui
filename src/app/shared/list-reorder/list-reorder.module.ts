import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReorderComponent } from './list-reorder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '@shared/components/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ListReorderComponent],
  imports: [
    CommonModule,
    DragDropModule,
    SharedModule,
    MatDialogModule,
  ],
})
export class ListReorderModule { }
