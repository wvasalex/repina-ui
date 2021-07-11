import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

  @Input() type: string;
  @Input() disabled: boolean;
  @Input() @HostBinding('class.w-100') fullwidth: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
