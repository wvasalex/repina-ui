import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Project } from '../projects.model';
import { ProjectsService } from '../projects.service';
import { ContentBlock } from '@shared/types';

@Component({
  selector: 'r-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {

  public render = this.projectsService.render;

  public project$: Observable<Project> = this.activatedRoute.data.pipe(pluck('project'));

  public menuColor: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {
  }

  ngOnInit(): void {

  }

  public $menuColor(project: Project): string {
    const root = project.content_blocks.find((block: ContentBlock) => {
      return block.block_type === 'project-root';
    });
    return root && root.props?.isDark ? 'black' : 'white';
  }

}
