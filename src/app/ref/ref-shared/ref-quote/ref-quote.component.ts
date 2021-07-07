import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref-quote',
  templateUrl: './ref-quote.component.html',
  styleUrls: ['./ref-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefQuoteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
