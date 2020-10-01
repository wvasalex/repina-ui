import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { GridDataType } from '@shared/grid/grid.model';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent extends BaseBlock implements OnInit {
  public type: GridDataType = 'big';

  public images: ContentElement[] = [];

  public ngOnInit() {
    this.images = this.elements.filter((element: ContentElement) => {
      return element.content_file;
    });

    if (this.editor) {
      return;
    }

    if (this.images.length === 1) {
      this.type = 'fullscreen';
    } else {
      this.type = (this.props.type || 'big') as GridDataType;
    }
  }
}
