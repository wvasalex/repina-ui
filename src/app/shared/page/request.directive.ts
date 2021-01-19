import { Directive, HostListener } from '@angular/core';
import { PageComponent } from './page.component';

@Directive({
  selector: '[rRequest]',
})
export class RequestDirective {

  constructor(
    private pageComponent: PageComponent,
  ) {
  }

  @HostListener('click') $onClick() {
    this.pageComponent.$priceRequest();
  }

}
