import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentListItem } from './lists.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListsService extends RestService {
  public config: ApiConfig = {
    path: '/content_lists/',
  };

  public data: BehaviorSubject<ContentListItem[]> = new BehaviorSubject<ContentListItem[]>([]);
  public type: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(public api: ApiService) {
    super();
  }

  public resolve<T>(list_type: string): Observable<ContentListItem[]> {
    return super.get({
      list_type,
    }).pipe(tap((list: ContentListItem[]) => {
      this.type.next(list_type);
      this.data.next(list);
    }));
  }
}
