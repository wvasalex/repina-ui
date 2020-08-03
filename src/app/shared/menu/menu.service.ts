import { Injectable } from '@angular/core';
import { RestService } from '../services/api/rest.service';
import { ApiConfig } from '../services/api/api.model';
import { ApiService } from '../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends RestService {

  public config: ApiConfig = {
    path: '/menu_header_blocks/',
  };

  constructor(public api: ApiService) {
    super();
  }
}
