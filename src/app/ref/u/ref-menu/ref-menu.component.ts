import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { REF_MENU_DOCS, REF_MENU_ITEMS } from './ref-menu.model';

@Component({
  selector: 'r-ref-menu',
  templateUrl: './ref-menu.component.html',
  styleUrls: ['./ref-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefMenuComponent implements OnInit {

  @Input() @HostBinding('class.embed') embed: boolean = false;

  @Output() openDrawer: EventEmitter<void> = new EventEmitter<void>();

  public items = REF_MENU_ITEMS;

  public docs = REF_MENU_DOCS;

  constructor() {
  }

  ngOnInit(): void {
  }

  public $openDrawer() {
    this.openDrawer.emit();
  }

}
