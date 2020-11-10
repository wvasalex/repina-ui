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
      per_page: 200,
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
    const servicesMap = field === 'tag_group' ? {} : services.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});

    const servicesGroup = services.reduce((result, item) => {
      let source = item[field];
      const source_id = source && source.id;

      if (source_id) {
        if (servicesMap[source_id]) {
          source = servicesMap[source_id];
        }

        if (!result[source_id]) {
          result[source_id] = [
            {
              id: source.slug,
              text: source.title,
              href: source.slug ? '/services/' + source.slug : null,
              position: source.position,
            },
          ];
        }
        result[source_id].push({
          id: item.slug,
          text: item.title,
          href: '/services/' + item.slug,
          position: item[positionKey],
        });
      }

      return result;
    }, {});

    const groups = Object.values(servicesGroup);
    groups.unshift([
      {
        text: 'Услуги',
        href: '/services',
        position: -1,
      },
    ]);

    const sort = (a, b) => {
      return a.position - b.position;
    };

    return groups.map((group: StrMap<any>[]) => {
      group.slice(1).sort(sort);
      return group;
    }).sort((a, b) => {
      return sort(a[0], b[0]);
    });
  }

}
