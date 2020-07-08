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
    this.el = this.host.nativeElement;
    this.init();

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
      return setTimeout(() => this.init(), 100);
    }

    this.top = box.top + window.scrollY;
    this.sub?.unsubscribe();

    const getOffset = () => {
      return -.3 * (this.top - window.scrollY) + window.innerHeight / 10;
    };

    this.sub = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(getOffset),
      startWith(getOffset()),
    ).subscribe((offset: number) => {
      if (this.direction == 'reverse') {
        this.renderer.setStyle(this.el, 'margin-top', '-' + (offset * .5) + 'px');
      } else if (offset <= 0) {
        this.renderer.setStyle(this.el, 'transform', 'translateY(' + offset + 'px)');
      }
    });
  }

}
