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
  private mobile: boolean = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private breakpointService: BreakpointService,
  ) {
  }

  public attach(host: HTMLElement, sphere: ViewContainerRef) {
    if (typeof window === 'undefined') {
      return;
    }

    this.host = host;
    this.sphere = sphere.element.nativeElement;
    this._subs.push(this.mobile$.subscribe());

    if (!this.mobile) {
      setTimeout(() => {
        this._initMove();
      }, 1200);
    }
  }

  public detach() {
    this._subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  private _initMove() {
    const rect = this.sphere.getBoundingClientRect();
    const parent = this.sphere.parentElement;
    const element = parent.removeChild(this.sphere);
    element.style.position = 'absolute';
    element.style.top = rect.top + 'px';
    element.style.left = rect.left + 'px';
    element.classList.add('absolute');

    const holder = this.doc.createElement('div');
    holder.style.width = rect.width + 'px';
    holder.style.height = rect.height + 'px';
    parent.appendChild(holder);
    this.host.appendChild(element);

    //this.sphere.classList.add('absolute');

    const move = fromEvent(this.doc.body, 'mousemove')
      .pipe(
        throttleTime(100),
      );

    this._subs.push(move.subscribe((e) => {
      this._move(e as MouseEvent);
    }));
  }

  private _move(e: MouseEvent) {
    if (this.editor) {
      return;
    }

    const s = this.sphere;
    const sphere_radius = s.clientHeight / 2;
    const wh = window.innerHeight;
    const ww = window.innerWidth;
    let left = Math.max(e.pageX, ww / 2);
    let top = Math.max(e.pageY, sphere_radius + 120);

    if (top + sphere_radius >= wh + 40) {
      top = wh - sphere_radius + 40;
    }

    //const bound: boolean = top <= 300 || ;

    /*if (top + sphere_radius >= wh + 100) {
      return;
    }*/

    /*if (threshold !== this.round) {
      this.round = threshold;
      s.classList.add('no-bg');
      s.classList.toggle('point', threshold);
      setTimeout(() => {
        s.classList.remove('no-bg');
      }, 330);
    }

    if (this.round) {
      left = e.pageX + 20;
    }*/

    s.style.left = (left - sphere_radius) + 'px';
    s.style.top = (top - sphere_radius) + 'px';
  }

}
