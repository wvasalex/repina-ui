import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit, Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'r-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyComponent implements OnInit, OnDestroy {

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
      this._visibleSub = fromEvent(window, 'scroll')
        .pipe(
          map(() => this._getVisibility()),
          distinctUntilChanged(),
          tap((visible: boolean) => {
            const el = this.ref.nativeElement;
            const method = visible ? 'addClass': 'removeClass';
            this.renderer[method](el, 'visible');
          }),
        ).subscribe();
    }
  }

  public ngOnDestroy() {
    this._visibleSub.unsubscribe();
  }

  private _getVisibility() {
    const top = window.pageYOffset;
    const _prev = this._lastTop;
    this._lastTop = top;

    return top < _prev && top >= this.threshold;
  }

}
