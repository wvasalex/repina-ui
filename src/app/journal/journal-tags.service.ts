import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { StrMap } from '@shared/types';
import { BlogTag } from './journal.model';

@Injectable({
  providedIn: 'root',
})
export class JournalTagsService extends RestService {
  public config: ApiConfig = {
    path: '/blog_tags/',
  };

  public data: BehaviorSubject<BlogTag[]> = new BehaviorSubject<BlogTag[]>([]);
  public type: BehaviorSubject<string> = new BehaviorSubject<string>('blog-tags');

  constructor(public api: ApiService) {
    super();

    this.resolve('blog-tags');
  }

  public resolve<T>(list_type: string): Observable<BlogTag[]> {
    return super.get({
      list_type,
    }).pipe(tap((list: BlogTag[]) => {
      this.type.next(list_type);
      this.data.next(list);
    }));
  }

  public save<T>(body: StrMap<any> = {}): Observable<T> {
    return super.save<T>(body.props).pipe(
      tap((item: any) => {
        this._update(item as BlogTag);
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

  private _update(updated: BlogTag) {
    const items = this.data.value;
    const index = items.findIndex((item: BlogTag) => {
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
    const index = items.findIndex((item: BlogTag) => {
      return item.id === removed;
    });

    if (index !== -1) {
      items.splice(index, 1);
    }

    this.data.next(items.slice());
  }
}
