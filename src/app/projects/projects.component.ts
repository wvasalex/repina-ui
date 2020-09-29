import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from './projects.service';
import { Project } from './projects.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {

  private projects$: Observable<Project[]> = this.projectsService.get<Project>();

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

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private breakpointService: BreakpointService,
              private projectsService: ProjectsService) {
  }

}
