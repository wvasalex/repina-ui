import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ArticleContentBlock } from '../../../journal/journal.model';

@Component({
  selector: 'r-blocks-render',
  templateUrl: './blocks-render.component.html',
  styleUrls: ['./blocks-render.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksRenderComponent implements OnInit {
  @Input() blocks: ArticleContentBlock[];
  @Input() editor: boolean = false;
  @Input() typeKey: string = 'block_type';

  constructor() { }

  ngOnInit(): void {
  }

}
