import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

const supported: boolean = typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window;

const observer: any = supported ? new IntersectionObserver((entries) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      const component = observer.components.get(entry.target);
      component.intersect();
    }
  });
}, {
  rootMargin: '0px 0px 20% 0px',
}) : {};

observer.components = new Map();

@Directive({
  selector: '[viewportIntersect]',
})
export class ViewportIntersectDirective implements AfterViewInit, OnDestroy {

  @Output() viewportIntersect: EventEmitter<HTMLElement> = new EventEmitter();

  constructor(private ref: ElementRef) {
  }

  public ngAfterViewInit() {
    if (!observer.observe) {
      return this.intersect();
    }

    observer.components.set(this.ref.nativeElement, this);
    observer.observe(this.ref.nativeElement as HTMLElement);
  }

  public ngOnDestroy() {
    this.destroy();
  }

  public intersect() {
    this.emit();
    this.destroy();
  }

  /**
   * Emit output event
   */
  private emit() {
    this.viewportIntersect.emit(this.ref.nativeElement);
  }

  private destroy() {
    observer.unobserve &&
      observer.unobserve(this.ref.nativeElement as HTMLElement);

    observer.components.delete(this.ref.nativeElement);
  }

}
