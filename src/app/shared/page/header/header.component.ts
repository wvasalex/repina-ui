import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() @HostBinding('style.backgroundImage') backgroundImage: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
