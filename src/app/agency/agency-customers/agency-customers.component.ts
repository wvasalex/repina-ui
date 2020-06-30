import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-agency-customers',
  templateUrl: './agency-customers.component.html',
  styleUrls: ['./agency-customers.component.scss']
})
export class AgencyCustomersComponent implements OnInit {
  public customers: string[] = [
    'Palmolive',
    'Протек',
    'Авиакомпания Победа',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
