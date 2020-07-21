import { ApiService } from './api.service';
import { StrMap } from '@shared/types';
import { ApiConfig } from '@shared/services/api/api.model';
import { Observable } from 'rxjs';

export class RestService {
  public config: ApiConfig;
  public api: ApiService;

  public save<T>(body: StrMap<any> = {}): Observable<T> {
    return body.id ?
      this.patch(body) :
      this.post(body);
  }

  public post<T>(body: StrMap<any> = {}) {
    return this.api.postStream<T>(this.config.path, body);
  }

  public get<T>(body: StrMap<any> = {}) {
    return this.api.getStream<T>(this.config.path, body);
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
}
