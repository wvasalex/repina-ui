import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root',
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

  public published$: Subject<Project[]> = new Subject<Project[]>();

  constructor(public api: ApiService) {
    super();
  }

  public groupProjectss(projects: Project[], chunkSize: number = 3): Project[][] {
    const chunks = [];

    for (let i = 0; i < projects.length; i += chunkSize) {
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

  public getRelevant(body: StrMap<any> = {}, limit: number = 5): Observable<Project[]> {
    return this.get(body).pipe(
      switchMap((projects: Project[]) => {
        if (projects.length === limit) {
          return of(projects);
        }

        return this.get({
          per_page: limit - projects.length,
          rnd_sort: true,
        }).pipe(
          map((extended: Project[]) => {
            projects.push(...extended);
            return projects;
          }),
        );
      }),
    );
  }

  public getPublished() {
    this.get().pipe(
      map((projects: Project[]) => {
        return projects.filter((project: Project) => {
          return project.is_enabled;
        });
      }),
      tap((projects: Project[]) => {
        this.published$.next(projects);
      })
    ).subscribe();
  }

}
