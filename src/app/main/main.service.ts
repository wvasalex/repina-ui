import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { ContentElement } from '@shared/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService extends RestService {

  public config: ApiConfig = {
    path: '/main_content_blocks/',
  };

  constructor(
    public api: ApiService,
    private projectsService: ProjectsService,
  ) {
    super();
  }

  public getProjects(elements: ContentElement[]) {
    const reqs = elements.filter((element: ContentElement) => {
      return element.element_type === 'main-project';
    }).map((element: ContentElement) => {
      return this.projectsService
        .get({ slug: element.props.project })
        .pipe(map((projects) => {
          const project = projects[0];
          project._element = element;
          return project;
        }))
        .toPromise();
    });

    return Promise.all(reqs);
  }

  public saveOrder(elements) {
    const reqs = [] = elements.map((el) => {
      return this.api.patchStream('/main_content_elements/' + el.id + '/', {
        position: el.position,
      }).toPromise();
    });
    return Promise.all(reqs);
  }

}
