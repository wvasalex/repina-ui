import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'r-project-snippet-overlay',
  templateUrl: './project-snippet-overlay.component.html',
  styleUrls: ['./project-snippet-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSnippetOverlayComponent implements OnInit {

  //@HostBinding('class.p-l') @HostBinding('class.p-r') _p: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
