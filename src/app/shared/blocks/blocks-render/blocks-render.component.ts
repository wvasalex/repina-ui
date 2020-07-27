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
    block._destroy = true;
  }

  public $visible(blocks: ArticleContentBlock[]): ArticleContentBlock[] {
    return blocks.filter((block: ArticleContentBlock) => {
      return block._destroy != true;
    });
  }

}
