import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ContentBlock } from '@shared/types';
import { Project } from '../projects.model';
import { ProjectsService } from '../projects.service';

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
    const root = this._getRoot(project);
    return root && root.props?.isDark ? 'black' : 'white';
  }

  public $background(project: Project): string {
    const root = this._getRoot(project);
    const url = root && root.content_elements?.length > 1 &&
      root.content_elements[1].content_file;

    return url ? 'url(' + url + ')' : null;
  }

  public $content(blocks: ContentBlock[]): ContentBlock[] {
    return blocks.slice(1);
  }

  private _getRoot(project: Project): ContentBlock {
    return project.content_blocks.find((block: ContentBlock) => {
      return block.block_type === 'project-root';
    });
  }

}
