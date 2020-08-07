import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleContentBlock, ArticleContentElement } from '../../../journal/journal.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-blocks-render',
  templateUrl: './blocks-render.component.html',
  styleUrls: ['./blocks-render.component.scss'],
})
export class BlocksRenderComponent implements OnInit {
  @Input() blocks: ArticleContentBlock[];
  @Input() editor: boolean = false;
  @Input() typeKey: string = 'block_type';

  //@Output() change: EventEmitter<void> = new EventEmitter<void>();
  @Output() addBlock: EventEmitter<StrMap<any>> = new EventEmitter<StrMap<any>>();

  constructor() { }

  ngOnInit(): void {
  }

  public $hasControls(block: ArticleContentBlock) {
    return block.block_type !== 'article-header';
  }

  public $remove(block: ArticleContentBlock) {
    if (confirm('Удалить контент?')) {
      if (block.id) {
        block._destroy = true;
      } else {
        this.blocks.splice(this.blocks.indexOf(block), 1);
      }
    }
  }

  public $visible(blocks: ArticleContentBlock[]): ArticleContentBlock[] {
    if (!Array.isArray(blocks)) {
      return blocks;
    }

    return blocks.filter((block: ArticleContentBlock) => {
      return block._destroy != true;
    }).sort((a: ArticleContentBlock, b: ArticleContentBlock) => {
      return a.position - b.position;
    });
  }

  public $move(block: ArticleContentBlock, offset: number) {
    const position: number = block.position;
    const new_position = position + offset;

    if (new_position < 0 || new_position > this.blocks.length) {
      return;
    }
    block.position = new_position;
    moveItemInArray(this.blocks, position, new_position);
  }

  public $swapElements(block: ArticleContentBlock) {
    const elements: ArticleContentElement[] = block.content_elements;
    const len: number = elements.length;
    block.content_elements.forEach((element: ArticleContentElement) => {
      element.position = len - element.position;
    });
    block.content_elements = block.content_elements.reverse();
  }

  public $addBlock(target: ArticleContentBlock, offset: number) {
    this.addBlock.emit({ target, offset });
  }
}
