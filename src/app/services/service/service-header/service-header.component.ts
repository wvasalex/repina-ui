import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-header',
  templateUrl: './service-header.component.html',
  styleUrls: ['./service-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceHeaderComponent extends BaseBlock {

}
