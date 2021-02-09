import { Directive, HostListener, Input } from '@angular/core';
import { PageComponent } from './page.component';

@Directive({
  selector: '[rRequest]',
})
export class RequestDirective {

  @Input() rRequest: boolean = true;

  constructor(
    private pageComponent: PageComponent,
  ) {
  }

  @HostListener('click') $onClick() {
    this.rRequest && this.pageComponent.$priceRequest();
  }

}
