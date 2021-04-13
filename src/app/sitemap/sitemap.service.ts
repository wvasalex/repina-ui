import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { Sitemap, SitemapItem } from './sitemap.model';

@Injectable()
export class SitemapService extends RestService {

  public config: ApiConfig = {
    path: '/sitemap/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public getFlatten(): Observable<SitemapItem[]> {
    return this.get().pipe(
      map((sitemap: Sitemap) => {
        return [
          {
            url: sitemap.agency_index,
            title: 'Агентство',
            root: true,
          },
          {
            url: sitemap.projects_index,
            title: 'Проекты',
            root: true,
          },
          ...sitemap.projects,
          {
            url: sitemap.services_index,
            title: 'Услуги',
            root: true,
          },
          ...sitemap.services,
          {
            url: sitemap.blog_index,
            title: 'Журнал',
            root: true,
          },
          ...sitemap.blog,
          {
            url: sitemap.contacts_index,
            title: 'Контакты',
            root: true,
          },
        ];
      }),
    );
  }

}
