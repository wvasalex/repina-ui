import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-footer-left',
  templateUrl: './footer-left.component.html',
  styleUrls: ['./footer-left.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterLeftComponent extends BaseBlock {

}
