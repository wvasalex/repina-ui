import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Project } from '../projects.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'r-project-snippet',
  templateUrl: './project-snippet.component.html',
  styleUrls: ['./project-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSnippetComponent implements OnInit {

  @Input() project: Project;
  @Input() @HostBinding('class.static') static: boolean = false;

  public mouseover: boolean = false;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
  }

  public $link(): string {
    return this.projectsService.getLink(this.project.slug);
  }

  public $hover(mouseover: boolean) {
    this.mouseover = mouseover;
  }

}
