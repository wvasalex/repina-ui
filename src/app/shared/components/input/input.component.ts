import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { errorAnimation } from '../../animations';

@Component({
  selector: 'r-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  animations: [
    errorAnimation,
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() required: boolean = false;
  @Input() placeholder: string = '';

  public value: string;
  public error: string;

  constructor() {
  }

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  public writeValue(value: any) {
    this.onChange(this.value = value || '');
    this.onTouch();
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
