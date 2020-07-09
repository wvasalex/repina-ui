import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'r-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent implements OnInit {
  @Output() closeDrawer: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('style.height.px') public height: number = document.documentElement.scrollHeight;

  constructor() { }

  ngOnInit(): void {
  }

  public $closeDrawer() {
    this.closeDrawer.emit();
  }
}
