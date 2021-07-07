import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefBlockComponent } from './ref-block/ref-block.component';
import { RefQuoteComponent } from './ref-quote/ref-quote.component';

@NgModule({
  declarations: [
    RefBlockComponent,
    RefQuoteComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RefBlockComponent,
    RefQuoteComponent,
  ],
})
export class RefSharedModule {
}
