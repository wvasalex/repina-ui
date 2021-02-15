import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-quote',
  templateUrl: './project-quote.component.html',
  styleUrls: ['./project-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectQuoteComponent extends BaseBlock {
  @HostBinding('class.p-l') get _pl() {
    return this.index === 0;
  };
  @HostBinding('class.center') get _index() {
    return this.index !== 0;
  };
  @HostBinding('class.p-r') pr = true;
}
