import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ArticleContentElement } from '../../../../journal/journal.model';

@Component({
  selector: 'r-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleImageComponent extends BaseBlock {
  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.api.postFile('/api/v1/blog_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ArticleContentElement) => {
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
      });
  }
}
