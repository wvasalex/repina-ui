import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleContentBlock, ArticleContentElement } from '../../../journal/journal.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-blocks-render',
  templateUrl: './blocks-render.component.html',
  styleUrls: ['./blocks-render.component.scss'],
})
export class BlocksRenderComponent implements OnInit {
  @Input() render: StrMap<Component> = {};
  @Input() blocks: ContentBlock[];
  @Input() editor: boolean = false;
  @Input() typeKey: 'block_type' | 'element_type' = 'block_type';
  @Input() availableElements: SelectOption[];

  //@Output() change: EventEmitter<void> = new EventEmitter<void>();
  @Output() addBlock: EventEmitter<StrMap<any>> = new EventEmitter<StrMap<any>>();

  constructor() { }

  ngOnInit(): void {
  }

  public $visible(blocks: ContentBlock[]) {
    return blocks.filter((block: ArticleContentBlock) => {
      return !block._destroy;
    }).sort((a, b) => {
      return a.position - b.position;
    });
  }

  public $hasControls(block: ContentBlock) {
    return this.typeKey == 'block_type' &&
      block.block_type !== 'article-header' &&
      block.block_type.match(/(article|project)/);
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
    const position: number = block.position;
    const new_position = position + offset;

    if (new_position < 0 || new_position > this.blocks.length) {
      return;
    }
    block.position = new_position;
    moveItemInArray(this.blocks, position, new_position);
  }

  public $swapElements(block: ContentBlock) {
    const elements: ArticleContentElement[] = block.content_elements;
    const len: number = elements.length;
    block.content_elements.forEach((element: ArticleContentElement) => {
      element.position = len - element.position;
    });
    block.content_elements = block.content_elements.reverse();
  }

  public $addBlock(target: ContentBlock, offset: number) {
    this.addBlock.emit({ target, offset });
  }

  public $setType(target: ContentBlock, type: string) {
    target.element_type = type;
  }

  public $component(block: ContentBlock) {
    return this.render[block[this.typeKey]];
  }
}
