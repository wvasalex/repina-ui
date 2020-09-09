import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ListsService } from '../lists/lists.service';
import { Observable } from 'rxjs';
import { ContentListItem } from '../lists/lists.model';

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

  public getAwards(): Observable<ContentListItem[]> {
    return this.listsService.get({
      list_type: 'awards',
    });
  }

  public getFeedback(): Observable<ContentListItem[]> {
    return this.listsService.get({
      list_type: 'feedback',
    });
  }

  public getMedia(): Observable<ContentListItem[]> {
    return this.listsService.get({
      list_type: 'media',
    });
  }

  public getCustomers(): Observable<ContentListItem[]> {
    return this.listsService.get({
      list_type: 'customers',
    });
  }

  public getTeam(): Observable<ContentListItem[]> {
    return this.listsService.get({
      list_type: 'team',
    });
  }
}
