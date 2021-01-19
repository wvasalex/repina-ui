import { Injectable } from '@angular/core';
import { PaginatorModule } from './paginator.module';
import { ActivatedRoute, Router } from '@angular/router';
import { StrMap } from '../types';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PagedResponse } from '@shared/services/api/api.model';

@Injectable({
  providedIn: 'any',
})
export class PaginatorService {

  public changes: Subject<StrMap<string>> = new Subject<StrMap<string>>();

  private paramsSub: Subscription = null;
  private page: number;
  private filters: StrMap<string>;
  private PREFIX: string = '';
  private base: string;
  private LS_KEY: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  public init() {
    this.base = this.router.url.split('?')[0].replace(/\//g, '_');
    this.LS_KEY = 'LIST_FILTER' + this.base;

    this.paramsSub = this.route.queryParams.pipe(
      debounceTime(200),
    )
      .subscribe(this.paramsChanged);
  }

  public destroy() {
    this.paramsSub.unsubscribe();
  }

  public setFilters(newFilters: StrMap<string>, page: number = 1) {
    const filters = {};
    Object.keys(newFilters).forEach(key => {
      const new_filter = newFilters[key];

      filters[`${this.PREFIX}${key}`] = Array.isArray(new_filter) ?
        new_filter.join(',') :
        new_filter;
    });

    const query_params = {...this.route.snapshot.queryParams};
    Object.keys(query_params).forEach(key => {
      if (key.indexOf(this.PREFIX) === 0) {
        delete query_params[key];
      }
    });
    Object.assign(query_params, filters, {page});

    const scrollTop: number = window.scrollY;
    this.router.navigate([], {queryParams: query_params}).then(() => {
      window.scrollTo(0, scrollTop);
    });
  }

  public getFilters() {
    return this.filters || {};
  }

  private paramsChanged = (params: StrMap<string>) => {
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

    this.changes.next(filters);
  };

  public paginate(page: PagedResponse<any>) {
    const pageSize = page.per_page;
    const maxPages = 5;
    let currentPage = page.page;
    let totalPages = Math.ceil(page.total_count / pageSize);

    if (totalPages == 1) {
      return {
        pages: [],
        currentPage,
      };
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, page.total_count - 1);

    let pages: any = Array.from(Array((endPage + 1) - startPage).keys()).map((i) => {
      const page = startPage + i;
      return {
        page,
        text: page,
        isActive: page == currentPage,
      };
    });

    if (currentPage > 1) {
      pages.unshift({
        page: 1,
        text: 'В начало',
      });
    }
    if (currentPage < totalPages) {
      pages.push({
        page: currentPage + 1,
        text: 'Вперед',
      });
    }

    return {
      pages,
      currentPage,
    };
  }

}
