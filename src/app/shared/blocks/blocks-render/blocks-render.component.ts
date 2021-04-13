import { Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'r-blocks-render',
  templateUrl: './blocks-render.component.html',
  styleUrls: ['./blocks-render.component.scss'],
})
export class BlocksRenderComponent implements OnInit {

  @Input() render: StrMap<Component> = {};
  @Input() data: any;
  @Input() blocks: ContentBlock[];
  @Input() @HostBinding('attr.editor') editor: boolean = false;
  @Input() typeKey: 'block_type' | 'element_type' = 'block_type';
  @Input() controlTmp: TemplateRef<any>;

  @Input() availableElements: SelectOption[];
  @Input() availableBlocks: SelectOption[];

  //@Output() change: EventEmitter<void> = new EventEmitter<void>();
  @Output() addBlock: EventEmitter<StrMap<any>> = new EventEmitter<StrMap<any>>();

  @Input() @HostBinding('class.animated') animated: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public $visible(blocks: ContentBlock[]) {
    return blocks.filter((block: ContentBlock) => {
      return block && !block._destroy;
    }).sort((a, b) => {
      return a.position - b.position;
    });
  }

  public $hasControls(block: ContentBlock) {
    return this.typeKey == 'block_type' &&
      //block.block_type !== 'article-header' &&
      block.block_type.indexOf('services') === -1 &&
      block.block_type.match(/(article|project|service)/);
  }

  public $remove(block: ContentBlock) {
    if (confirm('Удалить контент?')) {
      if (block.id) {
        block._destroy = true;
      } else {
        this.blocks.splice(this.blocks.indexOf(block), 1);
      }
    }
  }

  public $move(block: ContentBlock, offset: number) {
    const position: number = block.position || this.blocks.indexOf(block);
    const new_position = position + offset;

    if (new_position < 0 || new_position > this.blocks.length) {
      return;
    }

    block.position = new_position;
    this.blocks.splice(position, 1);
    this.blocks.splice(new_position, 0, block);
  }

  public $swapElements(block: ContentBlock) {
    const elements: ContentElement[] = block.content_elements;
    const len: number = elements.length;
    block.content_elements.forEach((element: ContentElement) => {
      element.position = len - element.position;
    });
    block.content_elements = block.content_elements.reverse();
  }

  public $addBlock(target: ContentBlock, offset: number, blockType?: String) {
    this.addBlock.emit({target, offset, blockType});
  }

  public $setType(target: ContentBlock, type: string) {
    target.element_type = type;
  }

  public $component(block: ContentBlock): any {
    return this.render[block[this.typeKey]];
  }

  public $checkMenu(menu: MatMenu) {
    if (!this.availableBlocks?.length) {
      menu.closed.emit('click');
    }
  }

  public $blockVisible(target, index: number) {
    if (!this.animated) {
      return;
    }

    const transform = 'translateY(0)';
    target.style.WebkitTransform = transform;
    target.style.transform = transform;
  }
}
