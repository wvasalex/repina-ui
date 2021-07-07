import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostBinding, Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'r-ref-drawer',
  templateUrl: './ref-drawer.component.html',
  styleUrls: ['./ref-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefDrawerComponent implements OnInit, OnDestroy {

  @Output() closeDrawer: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private renderer2: Renderer2,
  ) {
  }

  public ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.renderer2.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  public ngOnDestroy() {
    this.renderer2.setStyle(document.body, 'overflow', '');
  }

  public $closeDrawer() {
    this.closeDrawer.emit();
  }

}
