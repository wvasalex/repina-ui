import { Injectable } from '@angular/core';
import { ResolverService } from '@shared/services/api/resolver.service';
import { Project } from '@shared/projects/projects.model';
import { ProjectsService } from '@shared/projects/projects.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver extends ResolverService<Project> {
  constructor(public service: ProjectsService) {
    super();
  }
}
