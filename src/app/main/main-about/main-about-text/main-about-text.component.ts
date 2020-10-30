import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-main-about-text',
  templateUrl: './main-about-text.component.html',
  styleUrls: ['./main-about-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAboutTextComponent extends BaseBlock {

}
