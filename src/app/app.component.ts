import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CountersService } from '@shared/services/counters.service';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointService } from '@shared/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  private _observe: Subscription;

  constructor(
    private renderer: Renderer2,
    private breakpointService: BreakpointService,
    private countersService: CountersService,) {
  }

  public ngOnInit(): void {
    if (!this.countersService.init()) {
      return;
    }

    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      const w = window.innerWidth;
      const breakpoints = [2048, 1920, 1366, 1024, 768, 320];
      let cn = breakpoints.find((breakpoint) => w > breakpoint) || 320;

      if (typeof window !== 'undefined' && cn != 320) {
        if ('ontouchstart' in window ||
          (window['DocumentTouch'] && document instanceof window['DocumentTouch'])) {
          cn = 320;
        }
      }

      if (typeof document !== 'undefined') {
        this.renderer.setAttribute(document.documentElement, 'class', 'w' + cn);
      }
    });
  }

  public ngOnDestroy(): void {
    this._observe?.unsubscribe();
  }

}
