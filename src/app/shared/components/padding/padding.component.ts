import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-padding',
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss']
})
export class PaddingComponent implements OnInit {
  @Input() @HostBinding('class.horizontal') horizontal: boolean = true;
  @Input() @HostBinding('class.disabled') disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
