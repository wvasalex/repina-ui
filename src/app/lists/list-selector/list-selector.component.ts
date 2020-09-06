import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ContentListTypes } from '../lists.model';

@Component({
  selector: 'r-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSelectorComponent implements OnInit {
  @Input() type: string = '';

  public types: string[] = ContentListTypes;

  constructor() {
  }

  ngOnInit(): void {
  }

}
