import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-main-project',
  templateUrl: './main-project.component.html',
  styleUrls: ['./main-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectComponent extends BaseBlock implements OnInit {

  @Input() project: Project;

  public published$: Subject<Project[]> = this.projectsService.published$;
  public project$: Observable<Project>;

  constructor(private projectsService: ProjectsService) {
    super();
  }

  public ngOnInit(): void {
    if (!this.project) {
      this._resolve();
    } else {
      this.project$ = of(this.project);
    }
  }

  public $projectChanged() {
    this._resolve();
  }

  public $toOption(project: Project): SelectOption {
    return {
      value: project.slug,
      label: project.title,
    };
  }

  private _resolve() {
    this.project$ = this.projectsService.get({
      slug: this.props.project,
    }).pipe(map((projects: Project[]) => {
      return projects[0];
    }));
  }

}
