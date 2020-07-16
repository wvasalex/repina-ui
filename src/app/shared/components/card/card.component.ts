import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() @HostBinding('attr.color') color: 'white' | 'black' = 'white';
  @Input() @HostBinding('attr.size') size: 'big' | 'small' = 'small';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
