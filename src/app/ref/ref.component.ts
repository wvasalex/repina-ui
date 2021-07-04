import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref',
  templateUrl: './ref.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
