import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ContentListItem } from '../lists/lists.model';
import { Service } from './services.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends RestService {

  public config: ApiConfig = {
    path: '/services/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public move(items: Service[], fromIndex: number, toIndex: number) {
    moveItemInArray(items, fromIndex, toIndex);

    items.forEach((item: Service, position: number) => {
      this.patch({
        id: item.slug,
        position,
      }).subscribe();
    });
  }

}
