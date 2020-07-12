import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StrMap } from '../../types';

@Component({
  selector: 'r-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit {
  @Input() @HostBinding('attr.type') type: number = 1;
  @Input() title: string;
  @Input() image: string;
  @Input() source: string = 'Forbes';

  constructor() { }

  ngOnInit(): void {
  }

}
