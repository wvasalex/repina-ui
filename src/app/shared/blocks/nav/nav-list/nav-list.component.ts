import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StrMap } from '@shared/types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'r-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent implements OnInit {

  @Output() sort: EventEmitter<any> = new EventEmitter<any>();

  @Input() blocks: StrMap<string>[][];
  @Input() editor: boolean;

  public primaryBlock: StrMap<string>[];

  constructor() {
  }

  ngOnInit(): void {
    if (this.blocks) {
      this.primaryBlock = this.blocks.splice(0, 1)[0];
    }
  }

  public $drop(event: CdkDragDrop<any>, block) {
    if (event.previousIndex === 0 || event.currentIndex === 0) {
      return;
    }

    moveItemInArray(block, event.previousIndex, event.currentIndex);
    this.sort.emit(block);
  }

}
