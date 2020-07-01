import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() title: string = 'Запрос коммерческого предложения';
  @Input() disablePadding: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
