import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Project } from '../../projects.model';

@Component({
  selector: 'r-project-next',
  templateUrl: './project-next.component.html',
  styleUrls: ['./project-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectNextComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
    this.project.description = 'Следующий проект';
  }

}
