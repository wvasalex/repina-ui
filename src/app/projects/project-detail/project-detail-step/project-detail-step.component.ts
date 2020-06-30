import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-project-detail-step',
  templateUrl: './project-detail-step.component.html',
  styleUrls: ['./project-detail-step.component.scss']
})
export class ProjectDetailStepComponent implements OnInit {
  @Input() index: number;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() color: 'dark' | 'light' = 'light';
  @Input() image: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
