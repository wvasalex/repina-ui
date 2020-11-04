import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-project-all',
  templateUrl: './project-all.component.html',
  styleUrls: ['./project-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectAllComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
