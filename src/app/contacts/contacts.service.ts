import { Injectable } from '@angular/core';
import { RestService } from '../shared/services/api/rest.service';
import { ApiConfig } from '../shared/services/api/api.model';
import { ApiService } from '../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService extends RestService {
  public config: ApiConfig = {
    path: '/contact_blocks/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public init() {
    this.post({
      block_type: 'contacts',
      props: {},
      is_enabled: true,
      content_elements: [
        {
          element_type: 'info',
          props: {
          },
        },
      ]
    }).subscribe();
  }
}
