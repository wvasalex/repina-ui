import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { ServiceHeaderComponent } from './service/service-header/service-header.component';
import { ServiceBlockComponent } from './service/service-block/service-block.component';
import { BlockBlankComponent } from '@shared/blocks/block-blank/block-blank.component';
import { ServiceTextComponent } from './service/service-text/service-text.component';
import { ServicesPrimaryComponent } from './services-primary/services-primary.component';
import { ServicesTechComponent } from './services-tech/services-tech.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceImageComponent } from './service/service-image/service-image.component';
import { ServiceQuoteComponent } from './service/service-quote/service-quote.component';
import { ServiceVideoComponent } from './service/service-video/service-video.component';
import { ServiceRequestComponent } from './service/service-request/service-request.component';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends RestService {

  public config: ApiConfig = {
    path: '/services/',
  };

  public render = {
    'blank': BlockBlankComponent,
    'services-primary': ServicesPrimaryComponent,
    'services-tech': ServicesTechComponent,
    'services-list': ServicesListComponent,
    'service-header': ServiceHeaderComponent,
    'service-block': ServiceBlockComponent,
    'service-text': ServiceTextComponent,
    'service-image': ServiceImageComponent,
    'service-quote': ServiceQuoteComponent,
    'service-video': ServiceVideoComponent,
    'service-request': ServiceRequestComponent,
  };

  constructor(public api: ApiService) {
    super();
  }

}
