import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridImageComponent } from './grid-image/grid-image.component';
import { GridTextComponent } from './grid-text/grid-text.component';

@NgModule({
  declarations: [GridComponent, GridImageComponent, GridTextComponent],
  exports: [
    GridComponent,
    MatGridListModule,
    GridImageComponent,
    GridTextComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
  ],
})
export class GridModule { }
