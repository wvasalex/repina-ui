import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-services-tech',
  templateUrl: './services-tech.component.html',
  styleUrls: ['./services-tech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesTechComponent extends BaseBlock {
}
