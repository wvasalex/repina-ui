import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { SelectOption } from '@shared/components/select/select.model';
import { StrMap } from '@shared/types';
import { ServicesTagsService } from '../services/services-tags.service';
import { ServiceTag } from '../services/services.model';

@Component({
  selector: 'r-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {

  private projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  public tags$: Observable<SelectOption[]> = this.servicesTagsService.get()
    .pipe(map((tags: ServiceTag[]) => {
      return tags
        .filter((tag: ServiceTag) => {
          return tag['show_in_projects'];
        })
        .map((tag: ServiceTag) => {
        return {
          value: tag.id,
          label: tag.title,
        };
      });
    }));

  private rows$: Observable<number> = this.breakpointService.change$
    .pipe(map((result: BreakpointState) => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const breakpoints = [1920, 1366, 1024, 768, 320];
      let cn = breakpoints.find((breakpoint) => w > breakpoint) || 320;

      if (cn >= 1024) {
        return 3;
      }
      if (cn == 320) {
        return 1;
      }
      return 2;
    }));

  public groups$: Observable<Project[][]> = combineLatest([this.projects$, this.rows$])
    .pipe(map(([projects, rows]) => {
      return this.projectsService.groupProjectss(projects, rows);
    }));

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointService: BreakpointService,
    private servicesTagsService: ServicesTagsService,
    private projectsService: ProjectsService,
  ) {
    this.projectsService.get<Project>()
      .subscribe((projects: Project[]) => {
        this.projects$.next(projects);
      });
  }

  public $applyTags(tags: SelectOption[]) {
    const keys = tags.map((option: SelectOption) => {
      return option.value;
    });

    let filters = {};
    if (tags.length) {
      filters = {
        tags__id__in: keys.join(','),
      };
    }
    this._load(filters);
  }

  public $reorder() {
    this.dialog.open(ListReorderComponent, {
      data: {
        items: this.projects$.value.map((project: Project) => {
          return {
            image: project.preview_file,
            ...project,
          };
        }),
        onChange: (items) => {
          this._save(items);
        },
      },
    });
  }

  private _save(items: Project[]) {
    items.forEach((item: Project) => {
      this.projectsService.patch({
        id: item.slug,
        position: item.position,
      }).subscribe();
    });

    this.projects$.next(items);
  }

  private _load(filters: StrMap<string> = {}) {
    this.projectsService.get<Project>(filters).subscribe((projects: Project[]) => {
      this.projects$.next(projects);
    });
  }

}
