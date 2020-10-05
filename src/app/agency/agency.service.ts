import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ListsService } from '../lists/lists.service';
import { Observable } from 'rxjs';
import { ContentListItem } from '../lists/lists.model';
import { ContentBlock, StrMap } from '@shared/types';
import { map } from 'rxjs/operators';

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

  public get<T>(body: StrMap<any> = {}): Observable<any> {
    return super.get(body).pipe(map((blocks: ContentBlock[]) => {
      return blocks.map(((block: ContentBlock) => {
        block.content_elements = block.content_elements.sort((a, b) => a.id - b.id);
        return block;
      }));
    }));
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
