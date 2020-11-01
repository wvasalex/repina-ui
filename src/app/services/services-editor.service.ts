import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesEditorService extends RestService {

  public config: ApiConfig = {
    path: '/service_content_blocks/',
  };

  constructor(public api: ApiService) {
    super();
  }

}
