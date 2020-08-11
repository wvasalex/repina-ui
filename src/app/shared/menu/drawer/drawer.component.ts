import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MenuService } from '@shared/menu/menu.service';
import { ContentBlock, ContentElement } from '@shared/types';

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

  public menu: ContentBlock;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private menuService: MenuService,
  ) {
  }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.height = document.documentElement.scrollHeight;
    }

    this.menuService.get().subscribe((block: ContentBlock) => {
      block.content_elements.sort((a, b) => {
        return a.position - b.position;
      });

      this.menu = block;
      this.changeDetectorRef.detectChanges();
    });
  }

  public $closeDrawer() {
    this.closeDrawer.emit();
  }

  public $priceRequest() {
    this.priceRequest.emit();
  }

  public $enabled(elements: ContentElement[]): ContentElement[] {
    return this.menuService.enabled(elements);
  }
}
