import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-services-header',
  templateUrl: './services-header.component.html',
  styleUrls: ['./services-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesHeaderComponent extends BaseBlock {

}
