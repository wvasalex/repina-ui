import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ServiceScope, ServiceTag } from '../../services.model';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-projects',
  templateUrl: './service-projects.component.html',
  styleUrls: ['./service-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceProjectsComponent extends BaseBlock {

  @Input() tag: ServiceTag;
  @Input() scope: ServiceScope;

  public projects$: Observable<Project[]> = this.projectsService.get({
    per_page: 7,
  });

  constructor(private projectsService: ProjectsService) {
    super();
  }

  ngOnInit(): void {

  }

}
