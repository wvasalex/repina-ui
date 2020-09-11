import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ProjectRootComponent } from './project/project-root/project-root.component';
import { ProjectBlockComponent } from './project/project-block/project-block.component';
import { ProjectImageComponent } from './project/project-image/project-image.component';
import { ProjectGalleryComponent } from './project/project-gallery/project-gallery.component';
import { ProjectTextComponent } from './project/project-text/project-text.component';
import { ProjectQuoteComponent } from './project/project-quote/project-quote.component';
import { ProjectVideoComponent } from './project/project-video/project-video.component';
import { Project } from './projects.model';
import { BlockBlankComponent } from '@shared/blocks/block-blank/block-blank.component';
import { ProjectRolesComponent } from './project/project-roles/project-roles.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends RestService {
  public config: ApiConfig = {
    path: '/projects/',
  };

  public render = {
    'blank': BlockBlankComponent,
    'project-root': ProjectRootComponent,
    'project-block': ProjectBlockComponent,
    'project-image': ProjectImageComponent,
    'project-video': ProjectVideoComponent,
    'project-gallery': ProjectGalleryComponent,
    'project-text': ProjectTextComponent,
    'project-quote': ProjectQuoteComponent,
    'project-roles': ProjectRolesComponent,
  };

  constructor(public api: ApiService) {
    super();
  }

  public groupProjectss(projects: Project[]): Project[][] {
    const chunks = [];
    const chuck_size = 3;

    for(let i = 0; i < projects.length; i += chuck_size) {
      const chunk: any[] = projects.slice(i, i + chuck_size);
      if (chunk.length < chuck_size) {
        chunk.push(new Array(chuck_size - chunk.length));
      }
      chunks.push(chunk);
    }

    return chunks;
  }
}
