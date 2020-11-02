import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ProjectsService } from '@shared/projects/projects.service';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectsComponent extends BaseBlock implements OnInit, OnChanges {

  public projects: ContentElement[];
  public promo: ContentElement[];

  constructor(private projectsService: ProjectsService) {
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

    this.promo = promo;
    this.projects = projects;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.editor.previousValue === false && changes.editor.currentValue === true) {
      this.projectsService.getPublished();
    }
  }

}
