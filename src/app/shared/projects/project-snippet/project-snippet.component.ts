import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Project } from '../projects.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'r-project-snippet',
  templateUrl: './project-snippet.component.html',
  styleUrls: ['./project-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSnippetComponent {

  @Input() project: Project;
  @Input() @HostBinding('class.static') static: boolean = false;
  @Input() blank: boolean = false;
  @Input() imageVisible: boolean;

  public mouseover: boolean = false;

  constructor() {
  }

  public $hover(mouseover: boolean) {
    this.mouseover = mouseover;
  }

}
