import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentListItem } from './lists.model';
import { tap } from 'rxjs/operators';
import { StrMap } from '@shared/types';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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

  public save<T>(body: StrMap<any> = {}): Observable<T> {
    return super.save<T>(body).pipe(
      tap((item: any) => {
        this._update(item as ContentListItem);
      }),
    );
  }

  public delete<T>(id: number): Observable<T> {
    return super.delete<T>(id).pipe(
      tap((item: any) => {
        this._delete(id);
      }),
    );
  }

  public move(fromIndex: number, toIndex: number) {
    const items = this.data.value;
    moveItemInArray(items, fromIndex, toIndex);

    this.data.next(items.slice());

    items.forEach((item: ContentListItem, position: number) => {
      item.position = position;
      this.patch(item).subscribe();
    });
  }

  private _update(updated: ContentListItem) {
    const items = this.data.value;
    const index = items.findIndex((item: ContentListItem) => {
      return item.id === updated.id;
    });

    if (index !== -1) {
      items[index] = updated;
    } else {
      items.push(updated);
    }

    this.data.next(items.slice());
  }

  private _delete(removed: number) {
    const items = this.data.value;
    const index = items.findIndex((item: ContentListItem) => {
      return item.id === removed;
    });

    if (index !== -1) {
      items.splice(index, 1);
    }

    this.data.next(items.slice());
  }
}
