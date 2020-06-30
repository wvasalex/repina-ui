import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Str2datePipe } from '@shared/helpers/str2date.pipe';

@NgModule({
  declarations: [
    Str2datePipe,
  ],
  exports: [
    Str2datePipe,
  ],
  imports: [
    CommonModule,
  ],
})
export class HelpersModule { }
