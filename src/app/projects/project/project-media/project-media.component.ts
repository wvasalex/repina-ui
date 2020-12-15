import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-media',
  templateUrl: './project-media.component.html',
  styleUrls: ['./project-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMediaComponent extends BaseBlock {

  @Output() contentFileChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() upload: EventEmitter<File> = new EventEmitter<File>();

  public $isImage(src: string): boolean {
    return !src || /\.(jpe?g|png|gif|svg)$/.test(src);
  }

  public $upload(file: File) {
    this.upload.emit(file);
  }

  public $contentFileChange(contentFile: string) {
    this.contentFileChange.emit(contentFile);
  }

}
