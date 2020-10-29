import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ProjectsService } from '@shared/projects/projects.service';

@Component({
  selector: 'r-main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectsComponent extends BaseBlock implements OnChanges {

  constructor(private projectsService: ProjectsService) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.editor.previousValue === false && changes.editor.currentValue === true) {
      this.projectsService.getPublished();
    }
  }

}
