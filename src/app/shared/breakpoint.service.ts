import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private breakpoints = [
    '(min-width: 2560px)',
    '(min-width: 1920px)',
    '(min-width: 1366px)',
    '(min-width: 1024px)',
    '(min-width: 768px)',
    '(min-width: 320px)',
  ];

  public change$ = this.breakpointObserver
    .observe(this.breakpoints);

  public mobile$: Observable<boolean> = this.change$.pipe(
    map(() => {
      return typeof window !== 'undefined' &&
        window.innerWidth < 768;
    }),
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

}
