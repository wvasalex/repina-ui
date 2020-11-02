import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ContentElement } from '@shared/types';
import { ApiService } from '@shared/services/api/api.service';

@Component({
  selector: 'r-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent extends BaseBlock {

  @Output() upload: EventEmitter<File> = new EventEmitter<File>();

  @Input() endpoint: string = '';

  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    if (!this.endpoint) {
      this.upload.emit(file);
      return;
    }

    this.api.postFile(`/api/v1/${this.endpoint}/${this.id}/`, data)
      .toPromise()
      .then((element: ContentElement) => {
        this.upload.emit(file);
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
      });
  }

  public $clear() {
    this.api.patchStream(`/${this.endpoint}/${this.id}/`, { content_file: null }).toPromise();
    this.contentFile = null;
    this.changeDetectoRef.detectChanges();
  }


}
