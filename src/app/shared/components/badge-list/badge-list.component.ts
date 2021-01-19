import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Input() set selected(options) {
    this._value = options.map((option) => option.value);
  };
  @Input() @HostBinding('class.inline') inline: boolean = true;

  private _value = [];

  constructor() { }

  ngOnInit(): void {

  }

  public $toggle(badge: SelectOption) {
    if (badge.meta?.disabled) {
      return;
    }

    const index: number = this._value.indexOf(badge.value);
    if (index == -1) {
      this._value.push(badge.value);
    } else {
      this._value.splice(index, 1);
    }

    this.itemChanged.emit({
      item: badge,
      checked: index == -1,
    });

    if (badge.value !== null) {
      this.changed.emit(this.getSelection());
    }
  }

  public $isSelected = (badge: SelectOption): boolean => {
    return this._value.indexOf(badge.value) !== -1;
  };

  public getSelection(): SelectOption[] {
    return this.badges.filter(this.$isSelected);
  }

}
