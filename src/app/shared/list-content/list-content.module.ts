import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContentComponent } from './list-content.component';
import { SharedModule } from '../components/shared.module';
import { BlocksModule } from '@shared/blocks/blocks.module';



@NgModule({
  declarations: [ListContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlocksModule,
  ],
  exports: [
    ListContentComponent,
  ],
})
export class ListContentModule { }
