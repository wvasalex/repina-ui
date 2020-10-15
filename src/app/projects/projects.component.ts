import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';

@Component({
  selector: 'r-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {

  private projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  private rows$: Observable<number> = this.breakpointService.change$
    .pipe(map((result: BreakpointState) => {
      const w = window.innerWidth;
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

  public types: string[] = [
    'Все', 'Брендинг', 'Позиционирование', 'Нейминг', 'Фирменный стиль',
    'Упаковка', 'Брендбук', 'Интерьер', 'Ритейл-брендинг', 'IT-брендинг',
  ];

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointService: BreakpointService,
    private projectsService: ProjectsService,
  ) {
    this.projectsService.get<Project>()
      .subscribe((projects: Project[]) => {
        this.projects$.next(projects);
      });
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

}
