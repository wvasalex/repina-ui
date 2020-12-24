import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
