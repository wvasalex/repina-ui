import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { StrMap } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends RestService {
  public config: ApiConfig = {
    path: '/blogs/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public patch<T>(body: StrMap<any> = {}) {
    return super.patch({...body, id: body.slug});
  }
}
