import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator.component';
import { SharedModule } from '@shared/components/shared.module';

@NgModule({
  declarations: [PaginatorComponent],
  exports: [
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
})
export class PaginatorModule { }
