import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-social-item',
  templateUrl: './social-item.component.html',
  styleUrls: ['./social-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialItemComponent extends BaseBlock {

}
