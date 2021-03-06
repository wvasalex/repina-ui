import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectOption } from '../components/select/select.model';
import { SelectComponent } from '@shared/components/select/select.component';

@Component({
  selector: 'r-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContentComponent {
  @Input() options$: Observable<SelectOption[]>;
  @Input() selected: SelectOption[] = [];
  @Input() editable: boolean = true;
  @Input() placeholder: string = 'Выбрать';

  @Output() valueChanges: EventEmitter<SelectOption[]> = new EventEmitter<SelectOption[]>();

  constructor() { }

  public $changed(select: SelectComponent) {
    const selectedOption = {...select.selectedOption};
    /*const option = this.selected.find((val: SelectOption) => {
      return val.value === selectedOption.value;
    });

    if (option) {
    //  return;
    }*/

    if (selectedOption.meta) {
      Object.assign(selectedOption, selectedOption.meta);
    }

    this.selected.push(selectedOption);
    this.valueChanges.emit(this.selected);

    select.reset();
  }

  public $labelChanged(item: SelectOption, label: string) {
    if (!label) {
      const index: number = this.selected.indexOf(item);
      this.selected.splice(index, 1);
    } else {
      item.label = label;
    }

    this.valueChanges.emit(this.selected);
  }

  public $valueChanged(item: SelectOption, value: string) {
    item.value = value;
    this.valueChanges.emit(this.selected);
  }
}
