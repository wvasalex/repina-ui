import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { StrMap } from '@shared/types';
import { BlogTag, TagUrlMap } from './journal.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectOption } from '@shared/components/select/select.model';

@Injectable({
  providedIn: 'root',
})
export class JournalTagsService extends RestService {
  public config: ApiConfig = {
    path: '/blog_tags/',
  };

  public tags$: BehaviorSubject<SelectOption[]> = new BehaviorSubject<SelectOption[]>([]);
  public data: BehaviorSubject<BlogTag[]> = new BehaviorSubject<BlogTag[]>([]);
  public type: BehaviorSubject<string> = new BehaviorSubject<string>('blog-tags');

  constructor(public api: ApiService) {
    super();
  }

  public getPublic(): Observable<SelectOption[]> {
    return this.get().pipe(map((tags: BlogTag[]) => {
        const active = tags.map((tag: BlogTag) => {
          return {
            value: tag.key,
            label: tag.title,
            meta: {
              href: TagUrlMap[tag.key],
            },
          };
        });

        active.unshift({
          value: null,
          label: 'Все',
          meta: {
            href: '',
          },
        });

        return active;
      }),
      tap((tags: SelectOption[]) => {
        this.tags$.next(tags);
      }),
    );
  }

  public resolve<T>(list_type: string): Observable<BlogTag[]> {
    return super.get({
      list_type,
    }).pipe(
      map((list: BlogTag[]) => {
        return list.map((tag: BlogTag) => {
          tag.props = {...tag};
          return tag;
        });
      }),
      tap((list: BlogTag[]) => {
        this.type.next(list_type);
        this.data.next(list);
      }),
    );
  }

  public save<T>(body: StrMap<any> = {}): Observable<T> {
    const {id, props} = body;
    return super.save<T>({id, ...props}).pipe(
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

  public move(fromIndex: number, toIndex: number) {
    const items = this.data.value;
    moveItemInArray(items, fromIndex, toIndex);

    this.data.next(items.slice());

    items.forEach((item, position: number) => {
      (item as any).position = position;
      this.patch(item).subscribe();
    });
  }

  public getTagByUrl(url: string): string {
    for (let id in TagUrlMap) {
      if (TagUrlMap[id] === url) {
        return id;
      }
    }
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
