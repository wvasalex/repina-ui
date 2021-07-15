import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref-agency-portfolio',
  templateUrl: './ref-agency-portfolio.component.html',
  styleUrls: ['./ref-agency-portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefAgencyPortfolioComponent implements OnInit {

  public items = [
    {
      label: 'Финансы',
      icon: '1.png',
    },
    {
      label: 'Технологии',
      icon: '2.png',
    },
    {
      label: 'Медицина',
      icon: '3.png',
    },
    {
      label: 'Мода',
      icon: '4.png',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
