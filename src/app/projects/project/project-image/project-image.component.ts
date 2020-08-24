import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-project-image',
  templateUrl: './project-image.component.html',
  styleUrls: ['./project-image.component.scss']
})
export class ProjectImageComponent extends BaseBlock {
  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.api.postFile('/api/v1/project_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ContentElement) => {
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
      });
  }
}
