import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { ServiceHeaderComponent } from './service/service-header/service-header.component';
import { ServiceBlockComponent } from './service/service-block/service-block.component';
import { BlockBlankComponent } from '@shared/blocks/block-blank/block-blank.component';
import { ServiceTextComponent } from './service/service-text/service-text.component';
import { ServiceTitleComponent } from './service/service-title/service-title.component';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends RestService {
  public config: ApiConfig = {
    path: '/services/',
  };

  public render = {
    'blank': BlockBlankComponent,
    'service-header': ServiceHeaderComponent,
    'service-block': ServiceBlockComponent,
    'service-title': ServiceTitleComponent,
    'service-text': ServiceTextComponent,
  };

  constructor(public api: ApiService) {
    super();
  }
}
