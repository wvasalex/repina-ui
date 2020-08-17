import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ArticleContentElement } from '../../../../journal/journal.model';

@Component({
  selector: 'r-article-video',
  templateUrl: './article-video.component.html',
  styleUrls: ['./article-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleVideoComponent extends BaseBlock {
  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);
console.log('upload');
    this.api.postFile('/api/v1/blog_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ArticleContentElement) => {
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
      });
  }
}
