import { Injectable } from '@angular/core';
import { ServicesPrimaryComponent } from './services-primary/services-primary.component';
import { ServicesTechComponent } from './services-tech/services-tech.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceHeaderComponent } from './service/service-header/service-header.component';
import { ServiceBlockComponent } from './service/service-block/service-block.component';
import { ServiceTextComponent } from './service/service-text/service-text.component';
import { ServiceImageComponent } from './service/service-image/service-image.component';
import { ServiceQuoteComponent } from './service/service-quote/service-quote.component';
import { ServiceVideoComponent } from './service/service-video/service-video.component';
import { ServiceRequestComponent } from './service/service-request/service-request.component';
import { RelatedProjectsComponent } from '@shared/projects/related-projects/related-projects.component';
import { ServiceRelatedWikiComponent } from './service/service-related-wiki/service-related-wiki.component';
import { ServicesHeaderComponent } from './services-header/services-header.component';

@Injectable({
  providedIn: 'root'
})
export class ServicesRenderService {

  public render = {
    'services-header': ServicesHeaderComponent,
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
    'service-projects': RelatedProjectsComponent,
    'service-related-wiki': ServiceRelatedWikiComponent,
  };

}
