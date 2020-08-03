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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ContentBlock, ContentElement } from '@shared/types';
import { MenuService } from '@shared/menu/menu.service';
import { map } from 'rxjs/operators';
import { ToasterService } from '@shared/toaster/toaster.service';

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

  public menu: ContentBlock;

  public editor = false;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private toasterService: ToasterService,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.get().pipe(map((blocks: ContentBlock[]) => {
      return blocks.find((block: ContentBlock) => {
        return block.block_type === 'menu';
      });
    })).subscribe((block: ContentBlock) => {
      block.content_elements.sort((a, b) => {
        return a.position - b.position;
      });

      this.menu = block;
      this.changeDetectorRef.detectChanges();
    });

    /*this.menuService.delete(1).subscribe();
    this.menuService.delete(2).subscribe();
    this.menuService.delete(3).subscribe();
    this.menuService.delete(4).subscribe();
    this.menuService.delete(5).subscribe();*/

    /*this.menuService.post({
      block_type: 'logo',
      is_enabled: true,
    }).subscribe();*/

    /*this.menuService.post({
      block_type: 'menu',
      props: {},
      is_enabled: true,
      content_elements: [
        {
          element_type: 'link',
          props: {
            text: 'Проекты',
            href: '/projects',
            enabled: true,
          },
        },
        {
          element_type: 'link',
          props: {
            text: 'Услуги',
            href: '/services',
            enabled: true,
          },
        },
        {
          element_type: 'link',
          props: {
            text: 'Агентство',
            href: '/agency',
            enabled: true,
          },
        },
        {
          element_type: 'link',
          props: {
            text: 'Журнал',
            href: '/blog',
            enabled: true,
          },
        },
        {
          element_type: 'link',
          props: {
            text: 'Контакты',
            href: '/contacts',
            enabled: true,
          },
        },
      ]
    }).subscribe();*/
  }

  public $openDrawer() {
    this.openDrawer.emit();
  }

  public $priceRequest() {
    this.priceRequest.emit();
  }

  public $toggleEditor() {
    this.editor = !this.editor;
  }

  public $enabled(elements: ContentElement[]): ContentElement[] {
    return elements.filter((element: ContentElement) => {
      return element.props.enabled;
    });
  }

  public $sort(event: CdkDragDrop<string[]>) {
    if (!this.editor) {
      return;
    }

    moveItemInArray(this.menu.content_elements, event.previousIndex, event.currentIndex);
    this.menu.content_elements.forEach((element: ContentElement, index: number) => {
      element.position = index;
    });
    this.$save();
  }

  public $save() {
    const req = this.menuService.save(this.menu).toPromise();

    this.toasterService.wrapPromise(req, 'Меню сохранено', 'Не уадлось сохранить меню!');
  }
}
