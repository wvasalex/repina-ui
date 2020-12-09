import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-project-image',
  templateUrl: './project-image.component.html',
  styleUrls: ['./project-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectImageComponent extends BaseBlock {

  @Output() upload: EventEmitter<File> = new EventEmitter<File>();

  public $upload(file: File) {
    this.upload.emit(file);
  }

  /*constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }*/

  /*public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.api.postFile('/api/v1/project_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ContentElement) => {
        this.upload.emit(file);
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
      });
  }

  public $clear() {
    this.api.patchStream('/project_content_elements/' + this.id + '/', { content_file: null }).toPromise();
    this.contentFile = null;
    this.changeDetectoRef.detectChanges();
  }*/

}
