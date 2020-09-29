import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { PageComponent } from '@shared/page/page.component';

@Component({
  selector: 'r-article-request',
  templateUrl: './article-request.component.html',
  styleUrls: ['./article-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleRequestComponent extends BaseBlock {

  constructor(private page: PageComponent) {
    super();
  }

  public $priceRequest() {
    this.page.priceRequest.emit();
  }

}
