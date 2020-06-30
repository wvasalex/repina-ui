import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GridDataSize, GridDataSizeDef, GridDataType } from './grid.model';
import { BreakpointService } from '../breakpoint.service';
import { BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() type: GridDataType = 'small';

  public def: GridDataSizeDef;
  public column: boolean = false;

  private _observe: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private breakpointService: BreakpointService) { }

  ngOnInit(): void {
    this.def = GridDataSize[this.type];

    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      let points: string[] = ['320', '768', '1024', '1366'].filter((width: string) => {
        return result.breakpoints[`(max-width: ${width}px)`];
      });

      this.column = false;
      if (points.indexOf('320') > -1) {
        this._small();
      } else if (points.indexOf('768') > -1) {
        this._medium();
      } else {
        this._default();
      }
    });
  }

  ngOnDestroy(): void {
    this._observe.unsubscribe();
  }

  private _small() {
    this.def = {
      cols: 1,
      roles: [1, 2, 3],
      grid: [
        {},
        {},
        {},
      ],
    }

    if (this.type == 'big') {
      this.column = true;
    }
    this.changeDetectorRef.detectChanges();
  }

  private _medium() {
    if (this.type == 'big-small') {
      this.def = {
        cols: 2,
        roles: [1, 2, 3],
        grid: [
          {colspan: 2, rowspan: 2},
          {},
          {},
        ],
      }
    }
    if (this.type == 'small-big') {
      this.def = {
        cols: 2,
        roles: [1, 2, 3],
        grid: [
          {},
          {},
          {colspan: 2, rowspan: 2},
        ],
      }
    }
    if (this.type == 'small') {
      this.def = {
        cols: 2,
        roles: [1, 2, 3],
        grid: [
          {colspan: 2, rowspan: 2},
          {},
          {},
        ],
      }
    }

    if (this.type == 'big') {
      this.column = true;
    }

    this.changeDetectorRef.detectChanges();
  }

  private _default() {
    this.def = GridDataSize[this.type];
    this.changeDetectorRef.detectChanges();
  }

}
