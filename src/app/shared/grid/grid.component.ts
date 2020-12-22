import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GridDataSize, GridDataSizeDef, GridDataType } from './grid.model';
import { BreakpointService } from '../breakpoint.service';
import { BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnDestroy {

  @Input() @HostBinding('attr.type') type: GridDataType = 'small';

  public def: GridDataSizeDef;
  @Input() rowHeight: string = '1.5:1';
  public column: boolean = false;
  public grid: boolean = true;

  private _observe: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    this.def = GridDataSize[this.type];

    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      let points: string[] = ['320', '768', '1024', '1366', '1920'].filter((width: string) => {
        return result.breakpoints[`(min-width: ${width}px)`];
      });

      this.column = false;
      if (points.indexOf('1024') > -1) {
        this._default();
      } else if (points.indexOf('768') > -1) {
        this._medium();
      } else {
        this._small();
      }
    });

    /*if (this.type === 'small-wide' || this.type === 'wide-small') {
      this.rowHeight = '1.5:1';
      console.log(this.rowHeight);
      this.changeDetectorRef.detectChanges();
    }*/
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

    //if (this.type == 'big') {
    this.grid = false;
    this.column = true;
    //}
    this.changeDetectorRef.detectChanges();
  }

  private _medium() {
    if (this.type == 'big-small') {
      this.def = {
        cols: 2,
        roles: [1, 2, 3],
        grid: [
          { colspan: 2, rowspan: 2 },
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
          { colspan: 2, rowspan: 2 },
        ],
      }
    }
    if (this.type == 'small') {
      this.def = {
        cols: 2,
        roles: [1, 2, 3],
        grid: [
          { colspan: 2, rowspan: 2 },
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
