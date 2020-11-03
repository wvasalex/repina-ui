import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit {

  @Input() disabled: boolean = false;

  static guid: number = 1;

  public uid: string;

  constructor() { }

  ngOnInit(): void {
    this.uid = 'checkbox_' + CheckboxComponent.guid++;
  }

}
