import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AgencyAward } from './agency-awards.model';

@Component({
  selector: 'r-agency-awards',
  templateUrl: './agency-awards.component.html',
  styleUrls: ['./agency-awards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyAwardsComponent implements OnInit {
  public awards: AgencyAward[] = [
    {
      year: 2019,
      title: 'Red dot',
      position: 'Победитель',
      type: 'Брендинг',
    },
    {
      year: 2019,
      title: 'The Dieline',
      position: 'Серебро',
      type: 'Упаковка',
    },
    {
      year: 2019,
      title: 'Red dot',
      position: 'Победитель',
      type: 'Брендинг',
    },
    {
      year: 2019,
      title: 'The Dieline',
      position: 'Серебро',
      type: 'Упаковка',
    },
    {
      year: 2019,
      title: 'Red dot',
      position: 'Победитель',
      type: 'Брендинг',
    },
    {
      year: 2019,
      title: 'The Dieline',
      position: 'Серебро',
      type: 'Упаковка',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
