import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleContentBlock } from '../../../journal/journal.model';

@Component({
  selector: 'r-blocks-render',
  templateUrl: './blocks-render.component.html',
  styleUrls: ['./blocks-render.component.scss'],
})
export class BlocksRenderComponent implements OnInit {
  @Input() blocks: ArticleContentBlock[];
  @Input() editor: boolean = false;
  @Input() typeKey: string = 'block_type';

  constructor() { }

  ngOnInit(): void {
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
    });
  }

}
