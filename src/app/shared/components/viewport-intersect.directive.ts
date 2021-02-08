import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

const supported: boolean = 'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window;

@Directive({
  selector: '[viewportIntersect]'
})
export class ViewportIntersectDirective implements AfterViewInit, OnDestroy {
  
  @Output() viewportIntersect: EventEmitter<any> = new EventEmitter();

  private observer: IntersectionObserver;
  
  constructor(private ref: ElementRef) {
  }
  
  public ngAfterViewInit() {
    if (!supported) {
      this.emit();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this.observer.observe(<Element>this.ref.nativeElement);
  }

  public ngOnDestroy() {
    this.destroy();
  }

  /**
   * Emit output event
   */
  private emit() {
    this.viewportIntersect.emit();
  }

  /**
   * Check for intersections
   * @param {Array<IntersectionObserverEntry>} entries
   */
  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.emit();
        this.destroy();
      }
    });
  };
  
  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this.ref.nativeElement;
  }

  private destroy() {
    if (!this.observer) {
      return;
    }

    this.observer.unobserve(<Element>this.ref.nativeElement);
    this.observer.disconnect();
    this.observer = null;
  }

}
