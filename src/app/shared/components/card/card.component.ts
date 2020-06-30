import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() color: 'white' | 'black' = 'white';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
