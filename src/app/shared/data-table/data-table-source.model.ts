import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Page, PaginatedEndpoint, Sort } from '@shared/data-table/data-table.model';
import { finalize, pluck, share, startWith, switchMap, tap } from 'rxjs/operators';
import { StrMap } from '@shared/types';

export interface TableDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;
  disconnect(): void;
}

export class PaginatedDataSource<T> implements TableDataSource<T> {
  private pageNumber = new Subject<number>();
  private sort = new Subject<Sort<T>>();
  private query: BehaviorSubject<StrMap<string>>;
  private loading = new Subject<boolean>();

  public loading$ = this.loading.asObservable();
  public page$: Observable<Page<T>>;
  public size: number;

  constructor(
    endpoint: PaginatedEndpoint<T>,
    initialSort: Sort<T>,
    initalQuery: StrMap<string> = {},
    size = 20) {

    this.size = size;
    this.query = new BehaviorSubject(initalQuery);

    const param$ = combineLatest([
      this.query,
      this.sort.pipe(startWith(initialSort))
    ]);

    this.page$ = param$.pipe(
      switchMap(([query, sort]) => this.pageNumber.pipe(
        startWith(0),
        switchMap((page: number) => {
          this.loading.next(true);

          return endpoint({
            page,
            sort,
            query,
            size: this.size
          }).pipe(
            finalize(() => this.loading.next(false)),
          );
        })
      )),
      share(),
    );
  }

  public sortBy(sort: Sort<T>): void {
    this.sort.next(sort);
  }

  public queryBy(query: StrMap<string>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }

  public fetch(event): void {
    this.size = event.pageSize;
    this.pageNumber.next(event.pageIndex);
  }

  public reload() {
    this.query.next({...this.query.getValue()});
  }

  public connect(): Observable<T[]> {
    return this.page$.pipe(pluck('content'), tap((a) => {
      console.log('tap', a);
    }));
  }

  public disconnect(): void {}
}
