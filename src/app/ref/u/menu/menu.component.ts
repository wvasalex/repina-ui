import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public items = [
    {
      href: 'info',
      label: 'Информация',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
