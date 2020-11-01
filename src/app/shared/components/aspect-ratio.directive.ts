import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rAspectRatio]',
})
export class AspectRatioDirective implements AfterViewInit {

  @Input() rAspectRatio: number = 435 / 312;

  constructor(
    private host: ElementRef,
    private renderer2: Renderer2,
  ) {
  }

  public ngAfterViewInit(): void {
    if (this.host.nativeElement.tagName.toLowerCase() === 'img') {
      this.host.nativeElement.onload = () => {
        this._fit();
      };
    }
    this._fit();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    setTimeout(() => this._fit(), 100);
  }

  private _fit() {
    if (typeof window === 'undefined') {
      return;
    }

    const width = this.host.nativeElement.getBoundingClientRect().width;
    this.renderer2.setStyle(this.host.nativeElement, 'height', (width / this.rAspectRatio) + 'px');
  }

}
