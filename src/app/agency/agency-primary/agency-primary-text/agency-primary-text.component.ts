import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-primary-text',
  templateUrl: './agency-primary-text.component.html',
  styleUrls: ['./agency-primary-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyPrimaryTextComponent extends BaseBlock {

  @HostBinding('class.row-column') _row = true;

}
