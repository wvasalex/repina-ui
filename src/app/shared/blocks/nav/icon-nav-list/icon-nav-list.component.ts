import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-icon-nav-list',
  templateUrl: './icon-nav-list.component.html',
  styleUrls: ['./icon-nav-list.component.scss']
})
export class IconNavListComponent implements OnInit {
  @Input() blocks: string[][];
  @Input() images: string[] = [];

  public primary: string;

  constructor() { }

  ngOnInit(): void {
    this.primary = this.blocks.splice(0, 1)[0][0];
  }

}
