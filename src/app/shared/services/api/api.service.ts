import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StrMap } from '@shared/types';
import { API_BASE_CONFIG, ApiRequestOptions, BaseApiConfig } from './api.model';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(API_BASE_CONFIG) private config: BaseApiConfig) {

    if (isPlatformServer(platformId)) {
      this.config.host = 'http://5.63.158.46';
    }
  }

  public postStream<T>(url: string, body: StrMap<any> = {}, options?: ApiRequestOptions): Observable<T> {
    return this._stream('post', url, body, options);
  }

  public getStream<T>(url: string, body: StrMap<any> = {}, options?: ApiRequestOptions): Observable<any> {
    options = options || {};
    options.params = body;

    return this.httpClient.get<T>(this.normalizeUrl('get', url, body), options);
  }

  public putStream<T>(url: string, body: StrMap<any> = {}, options?: ApiRequestOptions): Observable<T> {
    return this._stream('put', url, body, options);
  }

  public patchStream<T>(url: string, body: StrMap<any> = {}, options?: ApiRequestOptions): Observable<any> {
    return this._stream('patch', url, body, options);
  }

  public deleteStream<T>(url: string, body: StrMap<any> = {}, options?: ApiRequestOptions): Observable<any> {
    return this._stream('delete', url, body, options);
  }

  public postFile<T>(url: string, data, options?: ApiRequestOptions): Observable<T> {
    return this.httpClient.patch<T>(url, data);
  }

  private _stream<T>(method: string, url: string, body: StrMap<any> = {}, options?: ApiRequestOptions): Observable<T> {
    const params = {...body};
    if (params.hasOwnProperty('slug')) {
      delete params.id;
    }

    return this.httpClient[method]<T>(this.normalizeUrl(method, url, body), params, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...options,
    });
  }

  private normalizeUrl(method: string, url: string, params: StrMap<string>): string {
    let href: string = this.config.host + this.config.base + url;

    if (params && href.indexOf(':') > -1) {
      const matches = href.match(/(:\w+)/ig);
      if (matches) {
        matches.forEach((match: string) => {
          href = href.replace(match, params[match.replace(':', '')] || '');
        });
      }
    }

    return href;
  }

}
