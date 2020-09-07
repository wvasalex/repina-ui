import { debounceTime } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataTableFilterParams } from '@shared/data-table/data-table-filters/data-table-filters.model';

@Injectable()
export class DataTableFiltersService {
  public changes: Subject<DataTableFilterParams> = new Subject<DataTableFilterParams>();

  private paramsSub: Subscription = null;
  private page: number;
  private filters: DataTableFilterParams;
  private PREFIX: string = 'f.';
  private base: string;
  private LS_KEY: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {

  }

  public init() {
    this.base = this.router.url.split('?')[0].replace(/\//g, '_');
    this.LS_KEY = 'LIST_FILTER' + this.base;

    if (!Object.keys(this.route.snapshot.queryParams).length) {
      this.restore();
    }

    this.paramsSub = this.route.queryParams.pipe(
      debounceTime(200))
      .subscribe(this.paramsChanged);
  }

  public destroy() {
    this.paramsSub.unsubscribe();
  }

  public setFilters(newFilters: DataTableFilterParams, page: number = 1) {
    const filters = {};
    Object.keys(newFilters).forEach(key => {
      const new_filter = newFilters[key];

      filters[`${this.PREFIX}${key}`] = Array.isArray(new_filter) ?
        new_filter.join(',') :
        new_filter;
    });

    const query_params = {...this.route.snapshot.queryParams};
    Object.keys(query_params).forEach((key) => {
      if (key.indexOf(this.PREFIX) === 0) {
        delete query_params[key];
      }
    });
    Object.assign(query_params, filters, {page});
    this.router.navigate([], {queryParams: query_params});
  }

  public getFilters() {
    return this.filters;
  }

  private paramsChanged = (params: DataTableFilterParams) => {
    let filters = Object.keys(params).reduce((map, cur) => {
      if (cur.indexOf(this.PREFIX) === 0) {
        const val = params[cur],
          key = cur.replace(this.PREFIX, '');

        if (val === 'true' || val === 'false') {
          map[key] = val === 'true';
        } else {
          map[key] = /^-?\d+$/.test(val) ?
            +val :
            val;
        }
      }
      return map;
    }, {});

    this.page = +params.page;
    this.filters = filters;

    if (!Object.keys(filters).length) {
      filters = null;
    }
    this.store();
    this.changes.next(filters);
  };

  private store() {
    const state = {
      ...this.filters,
      page: this.page,
    };

    window.localStorage.setItem(this.LS_KEY, JSON.stringify(state));
  }

  private restore() {
    const stored = window.localStorage.getItem(this.LS_KEY);
    if (stored) {
      const {page, ...filters} = JSON.parse(stored);

      this.setFilters(filters, page);
    }
  }
}
