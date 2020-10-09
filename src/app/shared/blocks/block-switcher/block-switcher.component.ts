import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-block-switcher',
  templateUrl: './block-switcher.component.html',
  styleUrls: ['./block-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockSwitcherComponent implements OnInit {

  @Input() availableElements: SelectOption[];

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public $change(selected: SelectOption) {
    this.change.emit(selected.value as string);
  }

}
