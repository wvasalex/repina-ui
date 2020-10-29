import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseBlock } from '@shared/blocks/block.component';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-main-project',
  templateUrl: './main-project.component.html',
  styleUrls: ['./main-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectComponent extends BaseBlock implements OnInit {

  public project$: Observable<Project>;

  constructor(private projectsService: ProjectsService) {
    super();
  }

  public ngOnInit(): void {
    this.project$ = this.projectsService.get({
      slug: this.props.project,
    }).pipe(map((projects: Project[]) => {
      return projects[0];
    }));
  }

}
