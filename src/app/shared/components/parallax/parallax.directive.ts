import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, startWith, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[r-parallax]',
})
export class ParallaxDirective implements OnInit, OnDestroy {

  @Input() direction: 'reverse' | null = null;

  @HostBinding('class.parallax') cn: boolean = true;

  private top: number;
  private el: HTMLElement;
  private sub: Subscription;
  private resize: Subscription;

  constructor(private renderer: Renderer2,
              private host: ElementRef) {
  }

  public ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }

    this.el = this.host.nativeElement;
    setTimeout(() => this.init(), 300);

    this.resize = fromEvent(window, 'resize').pipe(
      debounceTime(600),
    ).subscribe(() => this.init());
  }

  public ngOnDestroy() {
    this.sub?.unsubscribe();
    this.resize?.unsubscribe();
  }

  private init() {
    const box = this.el.getBoundingClientRect();

    if (box.height == 0) {
      console.log('reinit');
      return setTimeout(() => this.init(), 300);
    }

    this.top = box.top + window.scrollY;
    this.sub?.unsubscribe();

    const getOffset = () => {
      return -.33 * (this.top - window.scrollY) + window.innerHeight / 6;
    };

    this.sub = fromEvent(window, 'scroll').pipe(
      throttleTime(30),
      map(getOffset),
      startWith(getOffset()),
    ).subscribe((offset: number) => {
      if (!this.isInViewport()) {
        return;
      }

      if (this.direction == 'reverse') {
        offset = Math.max(offset, 0);
        //this.renderer.setStyle(this.el, 'transform', 'translateY(-' + offset + 'px)');

        this.renderer.setStyle(this.el, 'margin-top', '-' + offset + 'px');
      } else {
        offset = Math.min(offset, 0);
        this.renderer.setStyle(this.el, 'transform', 'perspective(500px) translate3d(0, ' + offset + 'px, 0)');
      }
    });
  }

  private isInViewport(): boolean {
    const bounding = this.el.getBoundingClientRect();

    return (
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight + window.scrollY)
    );
  };

}
