import { Injectable } from '@angular/core';
import { ResolverService } from '@shared/services/api/resolver.service';
import { Project } from '@shared/projects/projects.model';
import { ProjectsService } from '@shared/projects/projects.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver extends ResolverService<Project> {
  constructor(public router: Router,
              public service: ProjectsService) {
    super();
  }
}
