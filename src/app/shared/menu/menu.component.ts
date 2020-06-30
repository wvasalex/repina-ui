import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { MenuItem, MenuItems } from './menu.model';

@Component({
  selector: 'r-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() @HostBinding('attr.color') color: 'white' | 'black' = 'white';

  public items: MenuItem[] = MenuItems;

  constructor() { }

  ngOnInit(): void {
  }

}
