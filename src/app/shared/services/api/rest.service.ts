import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StrMap } from '@shared/types';
import { ApiConfig, PagedRequest, PagedResponse } from '@shared/services/api/api.model';

export class RestService {

  public config: ApiConfig;
  public api: ApiService;

  public save<T>(body: StrMap<any> = {}): Observable<T> {
    const {_new, ...data} = body;
    const uid = body._slug || body.slug || body.id;

    return uid && !_new ?
      this.patch({
        ...data,
        id: uid,
      }) :
      this.post(data);
  }

  public post<T>(body: StrMap<any> = {}) {
    return this.api.postStream<T>(this.config.path, body);
  }

  public get<T>(body: StrMap<any> = {}) {
    if (!body.per_page) {
      body.per_page = 999;
    }

    return this.api.getStream(this.config.path, body).pipe(
      map((data) => {
        return data.results || data;
      }),
    );
  }

  public getPage<T>(req: PagedRequest): Observable<PagedResponse<T>> {
    if (!req.per_page) {
      req.per_page = 15;
    }

    return this.api.getStream(this.config.path, req).pipe(
      map((page: PagedResponse<T>) => {
        page.per_page = req.per_page;
        return page;
      }),
    );
  }

  public getById<T>(body: StrMap<any> = {}) {
    return this.api.getStream<T>(this.config.path + ':id/', body);
  }

  public patch<T>(body: StrMap<any> = {}) {
    return this.api.patchStream<T>(this.config.path + ':id/', body);
  }

  public put<T>(body: StrMap<any> = {}) {
    return this.api.putStream(this.config.path + ':id/', body);
  }

  public delete<T>(id: number) {
    return this.api.deleteStream(this.config.path + ':id/', {id});
  }

  public resolve<T>(id: string) {
    return this.api.getStream<T>(this.config.path + ':id/', {id});
  }

  public bulkResolve(slugs: string[]) {
    return this.get({
      slug__in: slugs.join(','),
    })
      .toPromise()
      .then((resolved) => {
        const map = resolved.reduce((acc, item) => {
          acc[item.slug] = item;
          return acc;
        }, {});

        return slugs.map((slug: string) => map[slug]);
      });
  }

}
