import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
