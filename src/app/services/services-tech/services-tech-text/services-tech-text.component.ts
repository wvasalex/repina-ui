import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-services-tech-text',
  templateUrl: './services-tech-text.component.html',
  styleUrls: ['./services-tech-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesTechTextComponent extends BaseBlock {

  @HostBinding('class.row-column') _row = true;

}
