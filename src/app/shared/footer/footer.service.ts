import { Injectable } from '@angular/core';
import { RestService } from '../services/api/rest.service';
import { ApiConfig } from '../services/api/api.model';
import { ApiService } from '../services/api/api.service';
import { ContentElement } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends RestService {
  public config: ApiConfig = {
    path: '/menu_footer_blocks/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public enabled(elements: ContentElement[]): ContentElement[] {
    return elements.filter((element: ContentElement) => {
      return element.props.enabled;
    });
  }
}
