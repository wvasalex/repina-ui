import { ElementRef, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, take, tap, throttleTime } from 'rxjs/operators';
import { BreakpointService } from '@shared/breakpoint.service';

@Injectable({
  providedIn: 'root',
})
export class MainAnimationService {

  public editor: boolean = false;

  private mobile$: Observable<boolean> = this.breakpointService.mobile$
    .pipe(
      take(1),
      tap((mobile: boolean) => {
          this.mobile = mobile;
        },
      ),
    );

  private _subs: Subscription[] = [];

  private host: HTMLElement;
  private sphere: HTMLElement;
  private round: boolean = false;
  private mobile: boolean = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private breakpointService: BreakpointService,
  ) {
  }

  public attach(host: HTMLElement, sphere: ViewContainerRef) {
    this.host = host;
    this.sphere = sphere.element.nativeElement;
    this._subs.push(this.mobile$.subscribe());

    setTimeout(() => {
      this._initMove();
    }, 1200);
  }

  public detach() {
    this._subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  private _initMove() {
    if (this.mobile) {
      return;
    }

    const rect = this.sphere.getBoundingClientRect();
    const parent = this.sphere.parentElement;
    const element = parent.removeChild(this.sphere);
    element.style.position = 'absolute';
    element.style.top = rect.top + 'px';
    element.style.left = rect.left + 'px';

    const holder = this.doc.createElement('div');
    holder.style.width = rect.width + 'px';
    holder.style.height = rect.height + 'px';
    parent.appendChild(holder);
    this.host.appendChild(element);

    const move = fromEvent(this.doc.body, 'mousemove')
      .pipe(
        throttleTime(100),
      );

    setTimeout(() => {
      move.pipe(
        take(1),
      ).subscribe(() => {
        this.sphere.classList.add('absolute');
      });

      this._subs.push(move.subscribe((e) => {
        this._move(e as MouseEvent);
      }));
    }, 3000);
  }

  private _move(e: MouseEvent) {
    if (this.editor) {
      return;
    }

    const s = this.sphere;

    const wh = window.innerHeight;
    const ww = window.innerWidth;
    let left = Math.max(e.pageX, ww/2);
    let top = e.pageY;

    if (top > wh + 100) {
      return;
    }

    const threshold = top <= 300 || top >= wh;

    if (threshold !== this.round) {
      this.round = threshold;
      s.classList.add('no-bg');
      s.classList.toggle('point', threshold);
      setTimeout(() => {
        s.classList.remove('no-bg');
      }, 330);
    }

    if (this.round) {
      left = e.pageX + 20;
    }

    this.sphere.style.left = left + 'px';
    this.sphere.style.top = top + 'px';
  }

}
