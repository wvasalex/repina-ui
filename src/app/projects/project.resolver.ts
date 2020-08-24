import { Injectable } from '@angular/core';
import { ResolverService } from '@shared/services/api/resolver.service';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver extends ResolverService<Project> {
  constructor(public service: ProjectsService) {
    super();
  }
}
