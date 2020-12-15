import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[rMousemove]',
})
export class MousemoveDirective implements OnInit, OnDestroy {

  @Output() rMousemove: EventEmitter<void> = new EventEmitter<void>();

  private _sub: Subscription;

  private x: number;
  private y: number;

  constructor(private ref: ElementRef) {
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(e) {
    this.x = e.x;
    this.y = e.y;
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(e) {
    this.x = this.y = null;
  }

  public ngOnInit(): void {
    this._sub = fromEvent(this.ref.nativeElement, 'mousemove')
      .pipe(
        throttleTime(100),
      )
      .subscribe((e) => this._checkMove(e));
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  private _checkMove(e) {
    if (Math.abs(e.x - this.x) >= 20 || Math.abs(e.y - this.y) >= 20) {
      this.rMousemove.emit();
    }
  }

}
