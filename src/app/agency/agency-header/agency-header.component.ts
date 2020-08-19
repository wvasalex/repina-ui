import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '../../shared/blocks/block.component';

@Component({
  selector: 'r-agency-header',
  templateUrl: './agency-header.component.html',
  styleUrls: ['./agency-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyHeaderComponent extends BaseBlock {

}
