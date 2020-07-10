import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { MenuItem, MenuItems } from './menu.model';

@Component({
  selector: 'r-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() @HostBinding('attr.color') color: 'white' | 'black' = 'white';

  @Output() openDrawer: EventEmitter<void> = new EventEmitter<void>();
  @Output() priceRequest: EventEmitter<void> = new EventEmitter<void>();

  public items: MenuItem[] = MenuItems;

  constructor() { }

  ngOnInit(): void {
  }

  public $openDrawer() {
    this.openDrawer.emit();
  }

  public $priceRequest() {
    this.priceRequest.emit();
  }
}
