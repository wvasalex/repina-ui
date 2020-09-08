import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ListsService } from '../lists/lists.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService extends RestService {
  public config: ApiConfig = {
    path: '/agency_blocks/',
  };

  constructor(public api: ApiService,
              private listsService: ListsService) {
    super();
  }

  public getAwards(page: number = 1) {
    return this.listsService.get({
      list_type: 'awards',
    });
  }

  public getFeedback(page: number = 1) {
    return this.listsService.get({
      list_type: 'feedback',
    });
  }

  public getMedia(page: number = 1) {
    return this.listsService.get({
      list_type: 'media',
    });
  }
}
