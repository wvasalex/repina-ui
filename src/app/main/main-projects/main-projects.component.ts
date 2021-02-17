import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ProjectsService } from '@shared/projects/projects.service';
import { ContentElement } from '@shared/types';
import { Project } from '@shared/projects/projects.model';

@Component({
  selector: 'r-main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectsComponent extends BaseBlock implements OnInit, OnChanges {

  public projects: ContentElement[];
  public promo: ContentElement[];
  public resolved: Project[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private projectsService: ProjectsService,
  ) {
    super();
  }

  public ngOnInit(): void {
    const promo = [];
    const projects = [];
    this.elements.forEach((element) => {
      if (element.element_type === 'main-promo') {
        promo.push(element);
      } else {
        projects.push(element);
      }
    });
    const slugs = projects.map((item) => item.props.project);

    this.promo = promo;
    this.projectsService.bulkResolve(slugs).then((resolved) => {
      this.resolved = resolved;
      this.projects = projects;
      this.changeDetectorRef.detectChanges();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.editor.previousValue === false && changes.editor.currentValue === true) {
      this.projectsService.getPublished();
    }
  }

}
