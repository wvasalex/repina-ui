import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AgencyMediaSnippet } from './agency-media.model';

@Component({
  selector: 'r-agency-media',
  templateUrl: './agency-media.component.html',
  styleUrls: ['./agency-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyMediaComponent implements OnInit {
  public articles: AgencyMediaSnippet[] = [
    {
      title: 'VC.RU',
      text: '«Пятёрочка» развлекает: Repina Branding создало маскота для hr-бренда сети',
      date: '21 — 01 / 2020',
    },
    {
      title: 'VC.RU',
      text: '«Пятёрочка» развлекает: Repina Branding создало маскота для hr-бренда сети',
      date: '21 — 01 / 2020',
    },
    {
      title: 'VC.RU',
      text: '«Пятёрочка» развлекает: Repina Branding создало маскота для hr-бренда сети',
      date: '21 — 01 / 2020',
    },
    {
      title: 'VC.RU',
      text: '«Пятёрочка» развлекает: Repina Branding создало маскота для hr-бренда сети',
      date: '21 — 01 / 2020',
    },
    {
      title: 'VC.RU',
      text: '«Пятёрочка» развлекает: Repina Branding создало маскота для hr-бренда сети',
      date: '21 — 01 / 2020',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
