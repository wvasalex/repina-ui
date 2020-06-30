import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputLabelComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
