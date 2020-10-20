import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StrMap } from '@shared/types';
import { BaseBlock } from '@shared/blocks/block.component';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { Service, ServiceScope, ServiceTag } from '../../services.model';

@Component({
  selector: 'r-service-projects',
  templateUrl: './service-projects.component.html',
  styleUrls: ['./service-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceProjectsComponent extends BaseBlock {

  public projects$: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) {
    super();
  }

  ngOnInit(): void {
    const service: Service = this.data.service as Service;

    const query: StrMap<number> = {
      per_page: 7,
    };

    if (service.tag) {
      query.tag_id = (service.tag as ServiceTag).id;
    }
    if (service.activity_scope) {
      query.activity_scope_id = (service.activity_scope as ServiceScope).id;
    }

    this.projects$ = this.projectsService.get(query);
  }

}
