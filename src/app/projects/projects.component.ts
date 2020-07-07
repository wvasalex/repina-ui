import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'r-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit, OnDestroy {
  public cols: number = 3;
  public images: string[] = ['1' ,'2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public types: string[] = [
    'Все', 'Брендинг', 'Позиционирование', 'Нейминг', 'Фирменный стиль',
    'Упаковка', 'Брендбук', 'Интерьер', 'Ритейл-брендинг', 'IT-брендинг',
  ];

  private _observe: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private breakpointService: BreakpointService) { }

  ngOnInit(): void {
    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      let points: string[] = ['320', '768', '1024', '1366'].filter((width: string) => {
        return result.breakpoints[`(max-width: ${width}px)`];
      });

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
    this.setCols(1);
  }

  private _medium() {
    this.setCols(2);
  }

  private _default() {
    this.setCols(3);
  }

  private setCols(num: number) {
    this.cols = num;
    this.changeDetectorRef.detectChanges();
  }
}
