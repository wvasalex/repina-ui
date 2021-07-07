import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  public items = [
    {
      href: 'info',
      label: 'Информация',
    },
    {
      href: 'about',
      label: 'Материалы',
    },
    {
      href: 'stat',
      label: 'Статистика',
    },
    {
      href: 'pay',
      label: 'Выплаты',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
