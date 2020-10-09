import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-quote',
  templateUrl: './service-quote.component.html',
  styleUrls: ['./service-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceQuoteComponent extends BaseBlock {

}
