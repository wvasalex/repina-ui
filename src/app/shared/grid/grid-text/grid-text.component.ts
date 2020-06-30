import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-grid-text',
  templateUrl: './grid-text.component.html',
  styleUrls: ['./grid-text.component.scss']
})
export class GridTextComponent implements OnInit {
  @Input() color: 'brown' | 'light' | 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
