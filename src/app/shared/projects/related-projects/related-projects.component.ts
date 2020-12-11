import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrMap } from '@shared/types';
import { BaseBlock } from '../../blocks/block.component';
import { ProjectsService } from '../projects.service';
import { Project } from '../projects.model';
import { Service, ServiceScope, ServiceTag } from '../../../services/services.model';

@Component({
  selector: 'r-related-projects',
  templateUrl: './related-projects.component.html',
  styleUrls: ['./related-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedProjectsComponent extends BaseBlock {

  @Input() project: Project;
  @Input() tags: ServiceTag[];

  public projects$: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) {
    super();
  }

  ngOnInit(): void {
    const query: StrMap<any> = {
      per_page: 6,
    };

    if (!this.tags) {
      const service: Service = this.data.service as Service;
      if (service.tags) {
        query.tags__id__in = service.tags.map((tag: ServiceTag) => tag.id).join(',');
      }
      if (service.activity_scope) {
        query.activity_scope_id = (service.activity_scope as ServiceScope).id;
      }
    } else {
      query.tags__id__in = this.tags.map((tag: ServiceTag) => tag.id).join(',');
    }

    this.projects$ = this.projectsService.getRelevant(query, 6).pipe(
      map((projects: Project[]) => {
        if (this.project) {
          projects = projects.filter((project: Project) => {
            return project.slug !== this.project.slug;
          });
        }
        return projects.slice(0, 5);
      }),
    );
  }

}
