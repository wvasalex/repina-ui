import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getOption, SelectOption } from './select.model';

@Component({
  selector: 'r-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {

  @Output() valueChanged: EventEmitter<string | number> = new EventEmitter<string | number>();

  @Input() options: SelectOption[];
  @Input() placeholder: string;
  @Input() search: boolean;
  @Input() readonly: boolean = false;
  @Input() label: string;
  @Input() multiple: boolean = false;

  public value: string | number;
  public selectedOption: SelectOption;

  public searchFocused: boolean = false;

  public term: string = '';

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  public writeValue(value: string | number) {
    this.onChange(this.value = value);
    this.onTouch();
    this.selectedOption = getOption(this.options, value);

    if (this.value != null) {
      this.valueChanged.emit(this.value);
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public $change(e: MatSelectChange) {
    this.writeValue(e.value);
  }

  public reset() {
    requestAnimationFrame(() => this.writeValue(null));
  }

  public $focus(focused: boolean, select: MatSelect) {
    this.searchFocused = focused;
    if (focused) {
      select.open();
    }
  }

  public $search(e: Event, select: MatSelect) {
    this.term = (e.target as HTMLInputElement).value;
    select.open();
  }

  public $filter(options: SelectOption[]) {
    if (!this.term?.length) {
      return options;
    }

    return options.filter((option: SelectOption) => {
      return option.label.toLowerCase().indexOf(this.term.toLowerCase()) != -1;
    });
  }

}
