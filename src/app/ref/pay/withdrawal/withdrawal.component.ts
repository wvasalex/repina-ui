import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
