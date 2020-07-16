import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() @HostBinding('attr.color') color: 'white' | 'black' = 'white';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;
  @Input() titleClass = 'h1';
  @Input() subtitleClass = 'h4';

  constructor() { }

  ngOnInit(): void {
  }

}
