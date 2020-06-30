import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-arrow',
  templateUrl: './arrow.component.svg',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements OnInit {
  @Input() color: string = '#000';
  @Input() @HostBinding('attr.type') type: 'prev' | 'next' = 'next';

  constructor() { }

  ngOnInit(): void {
  }

}
