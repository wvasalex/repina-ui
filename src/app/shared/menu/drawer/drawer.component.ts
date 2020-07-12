import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { MenuItem, MenuItems } from '../menu.model';

@Component({
  selector: 'r-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent implements OnInit {
  @Output() closeDrawer: EventEmitter<void> = new EventEmitter<void>();
  @Output() priceRequest: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('style.height.px') public height: number;

  public items: MenuItem[] = MenuItems;

  constructor() { }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.height = document.documentElement.scrollHeight;
    }
  }

  public $closeDrawer() {
    this.closeDrawer.emit();
  }

  public $priceRequest() {
    this.priceRequest.emit();
  }
}
