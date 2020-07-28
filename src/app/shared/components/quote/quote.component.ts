import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
