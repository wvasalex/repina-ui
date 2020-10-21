import { Injectable } from '@angular/core';
import { ServicesGroupsService } from './services-groups.service';
import { ServicesService } from './services.service';
import { Observable } from 'rxjs';
import { Service, ServiceTagGroup } from './services.model';
import { filter, map } from 'rxjs/operators';
import { StrMap } from '@shared/types';

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
    return this.servicesService.get({
      service_type__in: 'complex,single',
    })
      .pipe(
        map((services: Service[]) => {
          return this._group(services, field);
        }),
      );
  }

  public sort(items, field) {
    const positionKey = field === 'tag_group' ? 'tag_group_position' : 'position';
    const reqs = items
      .filter((item) => {
        return item.id;
      })
      .map((item, index) => {
        return this.servicesService.patch({
          id: item.id,
          [positionKey]: index + 1,
        }).toPromise();
      });

    return Promise.all(reqs);
  }

  private _group(services: Service[], field) {
    const positionKey = field === 'tag_group' ? 'tag_group_position' : 'position';

    const servicesMap = services.reduce((result, item) => {
      const source = item[field];
      const tag_id = source && source.id;
      if (tag_id) {
        if (!result[tag_id]) {
          result[tag_id] = [
            {
              id: source.slug,
              text: source.title,
              href: source.slug ? '/services/' + source.slug : null,
              position: 0,
            },
          ];
        }
        result[tag_id].push({
          id: item.slug,
          text: item.title,
          href: '/services/' + item.slug,
          position: item[positionKey],
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

    return groups.map((group: StrMap<any>[]) => {
      group.sort((a, b) => {
        return a.position - b.position;
      });
      return group;
    });
  }

}
