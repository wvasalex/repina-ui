import { Injectable } from '@angular/core';
import { RestService } from '../services/api/rest.service';
import { ApiService } from '../services/api/api.service';
import { ApiConfig } from '../services/api/api.model';
import { BlockBlankComponent } from '../blocks/block-blank/block-blank.component';
import { ProjectRootComponent } from '../../projects/project/project-root/project-root.component';
import { ProjectBlockComponent } from '../../projects/project/project-block/project-block.component';
import { ProjectImageComponent } from '../../projects/project/project-image/project-image.component';
import { ProjectGalleryComponent } from '../../projects/project/project-gallery/project-gallery.component';
import { ProjectTextComponent } from '../../projects/project/project-text/project-text.component';
import { ProjectQuoteComponent } from '../../projects/project/project-quote/project-quote.component';
import { ProjectVideoComponent } from '../../projects/project/project-video/project-video.component';
import { Project } from './projects.model';
import { ProjectRolesComponent } from '../../projects/project/project-roles/project-roles.component';
import { ProjectFeedbackComponent } from '../../projects/project/project-feedback/project-feedback.component';
import { ProjectArticlesComponent } from '../../projects/project/project-articles/project-articles.component';
import { StrMap } from '../types';
import { Observable } from 'rxjs';

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
    'project-feedback': ProjectFeedbackComponent,
    'project-articles': ProjectArticlesComponent,
  };

  constructor(public api: ApiService) {
    super();
  }

  public public

  get<T>(body: StrMap<any> = {}): Observable<any> {
    return super.get(body);
  }

  public groupProjectss(projects: Project[], chunkSize: number = 3): Project[][] {
    const chunks = [];

    for(let i = 0; i < projects.length; i += chunkSize) {
      const chunk: any[] = projects.slice(i, i + chunkSize);
      if (chunk.length < chunkSize) {
        chunk.push(...new Array(chunkSize - chunk.length));
      }
      chunks.push(chunk);
    }

    return chunks;
  }

  public getLink(slug: string): string {
    return '/projects/' + slug;
  }

}