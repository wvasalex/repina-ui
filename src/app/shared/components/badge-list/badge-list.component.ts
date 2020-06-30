import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent implements OnInit {
  @Input() badges: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
