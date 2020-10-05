import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-gallery',
  templateUrl: './agency-gallery.component.html',
  styleUrls: ['./agency-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyGalleryComponent extends BaseBlock {

}
