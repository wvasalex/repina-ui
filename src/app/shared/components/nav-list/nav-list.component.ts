import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
  @Input() blocks: string[][];
  public primary: string[];

  constructor() { }

  ngOnInit(): void {
    this.primary = this.blocks.splice(0, 1)[0];
  }

}
