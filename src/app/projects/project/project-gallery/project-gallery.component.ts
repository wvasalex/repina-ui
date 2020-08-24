import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent extends BaseBlock {

}
