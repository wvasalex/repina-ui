import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-image',
  templateUrl: './agency-image.component.html',
  styleUrls: ['./agency-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyImageComponent extends BaseBlock {

}
