import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { ContentBlock } from '@shared/types';
import { Project } from '@shared/projects/projects.model';
import { ProjectsService } from '@shared/projects/projects.service';
import { FooterService } from '@shared/footer/footer.service';

@Component({
  selector: 'r-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit, OnDestroy {

  public render = this.projectsService.render;

  public project$: Observable<Project> = this.activatedRoute.data.pipe(
    pluck('project'),
    tap((project: Project) => {
      this.footerService.setBreadcrumbs([
        {
          href: '/projects',
          text: 'Проекты',
        },
        {
          href: '/projects/' + project.slug,
          text: project.title,
        },
      ]);
    }),
  );

  public menuColor: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private footerService: FooterService,
  ) {
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.footerService.setBreadcrumbs([]);
  }

  public $menuColor(project: Project): string {
    const root = this._getRoot(project);
    return root && root.props?.isDark ? 'black' : 'white';
  }

  public $background(project: Project): string {
    const root = this._getRoot(project);
    const url = root && root.content_elements?.length > 1 &&
      root.content_elements[1].content_file;

    return url;
  }

  public $content(blocks: ContentBlock[]): ContentBlock[] {
    if (!blocks?.length) {
      return [];
    }

    blocks = blocks.slice();
    blocks[0].content_elements.slice(1);
    return blocks;
  }

  private _getRoot(project: Project): ContentBlock {
    return project.content_blocks.find((block: ContentBlock) => {
      return block.block_type === 'project-root';
    });
  }

}
