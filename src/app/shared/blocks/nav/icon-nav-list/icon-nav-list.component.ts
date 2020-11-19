import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-icon-nav-list',
  templateUrl: './icon-nav-list.component.html',
  styleUrls: ['./icon-nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconNavListComponent implements OnInit {

  @Input() blocks: string[][];
  @Input() title: String;
  @Input() elements: ContentElement[];
  @Input() images: string[] = [];
  @Input() itemTemplate: TemplateRef<any>;

  public primary: string;

  constructor() { }

  ngOnInit(): void {
  }

}
