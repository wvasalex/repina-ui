import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  @Input() tags: ServiceTag[];

  public projects$: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) {
    super();
  }

  ngOnInit(): void {
    const query: StrMap<any> = {
      per_page: 5,
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

    this.projects$ = this.projectsService.getRelevant(query);
  }

}
