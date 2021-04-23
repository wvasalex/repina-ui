import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { SelectOption } from '@shared/components/select/select.model';
import { JournalTagsService } from '../journal/journal-tags.service';
import { ServiceTag } from './services.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesTagsService extends JournalTagsService {

  public config: ApiConfig = {
    path: '/service_tags/',
  };

  public tags$: BehaviorSubject<SelectOption[]> = new BehaviorSubject<SelectOption[]>([]);
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
                key: tag.key
              },
            };
          });

        active.unshift({
          value: null,
          label: 'Все',
          meta: {
            key: '',
          },
        });

        return active;
      }),
      tap((tags: SelectOption[]) => {
        this.tags$.next(tags);
      }),
    );
  }

}
