import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-text',
  templateUrl: './service-text.component.html',
  styleUrls: ['./service-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceTextComponent extends BaseBlock {

}
