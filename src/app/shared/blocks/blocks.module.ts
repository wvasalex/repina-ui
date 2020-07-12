import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCardComponent } from './promo-card/promo-card.component';



@NgModule({
  declarations: [PromoCardComponent],
  exports: [
    PromoCardComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class BlocksModule { }
