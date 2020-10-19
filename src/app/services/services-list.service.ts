import { Injectable } from '@angular/core';
import { ServicesGroupsService } from './services-groups.service';
import { ServicesService } from './services.service';
import { Observable } from 'rxjs';
import { Service, ServiceTagGroup } from './services.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesListService {

  constructor(
    private servicesGroupsService: ServicesGroupsService,
    private servicesService: ServicesService,
  ) {
  }

  public groupByGroup(): Observable<any> {
    return this.servicesService.get()
      .pipe(
        map((services: Service[]) => {
          return this._group(services);
        }),
      );
  }

  private _group(services: Service[]) {
    const servicesMap = services.reduce((result, item) => {
      const tag_id = item.tag_group && (item.tag_group as ServiceTagGroup).id;
      if (tag_id) {
        if (!result[tag_id]) {
          result[tag_id] = [
            {
              text: (item.tag_group as ServiceTagGroup).title,
              href: null,
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
