import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { PagedResponse } from '@shared/services/api/api.model';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input() data$: Observable<PagedResponse<any>>;

  public pagination$: Subject<any> = new Subject<any>();

  private _sub: Subscription;

  constructor(private paginatorService: PaginatorService) {
  }

  public ngOnInit(): void {
    this._sub = this.data$.subscribe((page: PagedResponse<any>) => {
      this.pagination$.next(this.paginatorService.paginate(page));
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public $queryParams(query: StrMap<string>) {
    const filters = Object.assign({}, this.paginatorService.getFilters(), query);
    delete filters.per_page;

    return filters;
  }

}
