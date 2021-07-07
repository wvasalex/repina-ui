import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref-block',
  templateUrl: './ref-block.component.html',
  styleUrls: ['./ref-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefBlockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
