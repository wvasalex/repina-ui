import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-service-image',
  templateUrl: './service-image.component.html',
  styleUrls: ['./service-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceImageComponent extends BaseBlock {
  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.api.postFile('/api/v1/service_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ContentElement) => {
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
      });
  }
}