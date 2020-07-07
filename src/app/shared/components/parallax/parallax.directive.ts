import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap, throttleTime } from 'rxjs/operators';

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
      throttleTime(100),
      tap((_) => {
        this.init();
      })).subscribe();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
    this.resize.unsubscribe();
  }

  private init() {
    const box = this.el.getBoundingClientRect();
    this.top = box.top + window.pageYOffset;

    this.sub?.unsubscribe();

    this.sub = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => {
        return -.25 * (this.top - window.scrollY);
      }),
    ).subscribe((offset: number) => {
      if (this.direction == 'reverse') {
        this.renderer.setStyle(this.el, 'margin-top', '-' + (offset * .5) + 'px');
      } else if (offset <= 0) {
        this.renderer.setStyle(this.el, 'transform', 'translateY(' + offset + 'px)');
      }
    });
  }

}
