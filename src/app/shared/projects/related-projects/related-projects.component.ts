import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
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
  @Input() @HostBinding('class.inline') inline: boolean = false;

  public projects$: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) {
    super();
  }

  ngOnInit(): void {
    const query: StrMap<any> = {};
    let tags: any = this.tags;

    if (!tags) {
      const service: Service = this.data.service as Service;
      if (service.tags) {
        tags = service.tags;
      }
      if (service.activity_scope) {
        query.activity_scope_id = (service.activity_scope as ServiceScope).id;
      }
    }

    query.tags__id__in = tags.map((tag: ServiceTag) => tag.id).join(',');

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
