import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent implements OnInit {
  @Input() blocks: StrMap<string>[][];

  public primaryBlock: StrMap<string>[];

  constructor() {
  }

  ngOnInit(): void {
    if (this.blocks) {
      this.primaryBlock = this.blocks.splice(0, 1)[0];
    }
  }

}
