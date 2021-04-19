import { Injectable } from '@angular/core';
import { JournalTagsService } from '../journal/journal-tags.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceTag, TagUrlMap } from './services.model';
import { SelectOption } from '@shared/components/select/select.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesTagsService extends JournalTagsService {

  public config: ApiConfig = {
    path: '/service_tags/',
  };

  public type: BehaviorSubject<string> = new BehaviorSubject<string>('services-tags');

  constructor(public api: ApiService) {
    super(api);
  }

  public getPublic(): Observable<SelectOption[]> {
    return this.get().pipe(map((tags: ServiceTag[]) => {
      const active = tags
        .filter((tag: ServiceTag) => {
          return tag.show_in_projects;
        })
        .map((tag: ServiceTag) => {
          return {
            value: tag.id,
            label: tag.title,
            meta: {
              href: TagUrlMap[tag.id]
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
    }));
  }

  public getTagByUrl(url: string): string {
    for(let id in TagUrlMap) {
      if (TagUrlMap[id] === url) {
        return id;
      }
    }
  }

}
