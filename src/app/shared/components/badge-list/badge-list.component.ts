import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeListComponent implements OnInit {

  @Output() changed: EventEmitter<SelectOption[]> = new EventEmitter<SelectOption[]>();
  @Output() itemChanged: EventEmitter<any> = new EventEmitter<any>();

  @Input() badges: SelectOption[] = [];
  @Input() selected: SelectOption[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public $toggle(badge: SelectOption) {
    const index: number = this.selected.indexOf(badge);
    if (index == -1) {
      this.selected.push(badge);
    } else {
      this.selected.splice(index, 1);
    }

    this.itemChanged.emit({
      item: badge,
      checked: index == -1,
    });
    this.changed.emit(this.selected);
  }

}
