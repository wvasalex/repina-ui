import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-repina',
  templateUrl: './agency-repina.component.html',
  styleUrls: ['./agency-repina.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyRepinaComponent extends BaseBlock {

}
