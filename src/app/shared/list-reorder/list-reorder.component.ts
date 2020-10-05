import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { ListReorderItem } from './list-reorder.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-list-reorder',
  templateUrl: './list-reorder.component.html',
  styleUrls: ['./list-reorder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListReorderComponent implements OnInit {

  @Input() items: ListReorderItem[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: StrMap<any>) {
    if (data.items) {
      this.items = data.items as ListReorderItem[];
    }
  }

  ngOnInit(): void {
  }

  public $drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.items.forEach((item: ListReorderItem, index) => {
      item.position = index;
    });

    if (this.data.onChange) {
      this.data.onChange.call(this, this.items);
    }
  }

}
