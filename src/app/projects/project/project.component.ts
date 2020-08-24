import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Project } from '../projects.model';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'r-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  public render = this.projectsService.render;

  public project: Project;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {
  }

  ngOnInit(): void {
    this.project = this.activatedRoute.snapshot.data.project;
  }
}
