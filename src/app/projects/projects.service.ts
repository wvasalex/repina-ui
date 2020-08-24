import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ProjectRootComponent } from './project/project-root/project-root.component';
import { ProjectBlockComponent } from './project/project-block/project-block.component';
import { ProjectImageComponent } from './project/project-image/project-image.component';
import { ProjectGalleryComponent } from './project/project-gallery/project-gallery.component';
import { ProjectTextComponent } from './project/project-text/project-text.component';
import { ProjectBlankComponent } from './project/project-blank/project-blank.component';
import { ProjectQuoteComponent } from './project/project-quote/project-quote.component';
import { ProjectVideoComponent } from './project/project-video/project-video.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends RestService {
  public config: ApiConfig = {
    path: '/projects/',
  };

  public render = {
    'blank': ProjectBlankComponent,
    'project-root': ProjectRootComponent,
    'project-block': ProjectBlockComponent,
    'project-image': ProjectImageComponent,
    'project-video': ProjectVideoComponent,
    'project-gallery': ProjectGalleryComponent,
    'project-text': ProjectTextComponent,
    'project-quote': ProjectQuoteComponent,
  };

  constructor(public api: ApiService) {
    super();
  }
}
