import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'r-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements OnInit {

  @Input() set checked(isChecked: boolean) {
    this.writeValue(isChecked);
  };

  @Input() @HostBinding('attr.color') color: 'white' | 'default' = 'default';

  static guid: number = 1;

  public uid: string;

  public value: boolean;

  private disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.uid = 'checkbox_' + CheckboxComponent.guid++;
  }

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  public writeValue(value: boolean) {
    this.onChange(this.value = value);
    this.onTouch();
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public $change(e: UIEvent) {
    this.writeValue((<HTMLInputElement>e.target).checked);
  }

}
