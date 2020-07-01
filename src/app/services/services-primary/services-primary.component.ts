import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-services-primary',
  templateUrl: './services-primary.component.html',
  styleUrls: ['./services-primary.component.scss']
})
export class ServicesPrimaryComponent implements OnInit {
  public services: string[] = [
    'Корпоративный брендинг',
    'Продуктовый брендинг',
    'Ритейл брендинг',
    'HR брендинг',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
