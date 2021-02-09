import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit, Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'r-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() threshold: number = 250;

  @HostBinding('class.visible') visible: boolean;

  private _lastTop: number = 0;
  private _visibleSub: Subscription;

  constructor(
    private renderer: Renderer2,
    private ref: ElementRef,
  ) {
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const el = this.ref.nativeElement;
      this._visibleSub = fromEvent(window, 'scroll')
        .pipe(
          throttleTime(100),
          map(() => this._getVisibility()),
          distinctUntilChanged(),
          tap((visible: boolean) => {
            const method = visible ? 'addClass' : 'removeClass';
            this.renderer[method](el, 'visible');
          }),
        ).subscribe();
    }
  }

  public ngAfterViewInit() {
    // TIMEOUT
    /*
    if (typeof window !== 'undefined') {
      setTimeout(() => this._setTop(), 1000);
      setTimeout(() => this._setTop(), 3000);
    }*/
  }

  public ngOnDestroy() {
    this._visibleSub?.unsubscribe();
  }

  private _getVisibility() {
    const top = window.pageYOffset;
    const _prev = this._lastTop;
    this._lastTop = top;

    return top < _prev && top >= this.threshold;
  }

  private _setTop() {
    const el = this.ref.nativeElement;
    this.renderer.setStyle(el, 'top', -el.offsetHeight + 'px');
  }

}
