import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'r-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeListComponent implements OnInit {

  @Output() changed: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input() badges: string[] = [];
  @Input() selected: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public $toggle(badge: string) {
    const index: number = this.selected.indexOf(badge);
    if (index == -1) {
      this.selected.push(badge);
    } else {
      this.selected.splice(index, 1);
    }

    this.changed.emit(this.selected);
  }

}
