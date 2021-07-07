import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-u',
  templateUrl: './u.component.html',
  styleUrls: ['./u.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
