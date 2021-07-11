import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-withdrawal-history',
  templateUrl: './withdrawal-history.component.html',
  styleUrls: ['./withdrawal-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
