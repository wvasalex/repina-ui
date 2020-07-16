import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private breakpoints = [
    '(min-width: 1920px)',
    '(min-width: 1366px)',
    '(min-width: 1024px)',
    '(min-width: 768px)',
    '(min-width: 320px)',
  ];

  public change$ = this.breakpointObserver
    .observe(this.breakpoints);

  constructor(private breakpointObserver: BreakpointObserver) { }
}
