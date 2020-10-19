import { Injectable } from '@angular/core';
import { ServicesGroupsService } from './services-groups.service';
import { ServicesService } from './services.service';
import { Observable } from 'rxjs';
import { Service, ServiceTagGroup } from './services.model';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesListService {

  constructor(
    private servicesGroupsService: ServicesGroupsService,
    private servicesService: ServicesService,
  ) {
  }

  public groupBy(field: string) {
    return this.servicesService.get()
      .pipe(
        map((services: Service[]) => {
          return this._group(services, field);
        }),
      );
  }

  private _group(services: Service[], field: string) {
    const servicesMap = services.reduce((result, item) => {
      const tag_id = item[field] && item[field].id;
      if (tag_id) {
        if (!result[tag_id]) {
          result[tag_id] = [
            {
              text: item[field].title,
              href: item[field].slug,
            },
          ];
        }
        result[tag_id].push({
          text: item.title,
          href: '/services/' + item.slug,
        });
      }
      return result;
    }, {});

    const groups = Object.values(servicesMap);
    groups.unshift([
      {
        text: 'Услуги',
        href: '/services',
      },
    ]);

    return groups;
  }

}
