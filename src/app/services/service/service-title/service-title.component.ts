import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-title',
  templateUrl: './service-title.component.html',
  styleUrls: ['./service-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceTitleComponent extends BaseBlock {

}