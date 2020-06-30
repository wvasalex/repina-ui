import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private breakpoints = [
    '(max-width: 1366px)',
    '(max-width: 1024px)',
    '(max-width: 768px)',
    '(max-width: 320px)',
  ];

  public change$ = this.breakpointObserver
    .observe(this.breakpoints);

  constructor(private breakpointObserver: BreakpointObserver) { }
}
