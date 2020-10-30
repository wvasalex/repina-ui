import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-main-about',
  templateUrl: './main-about.component.html',
  styleUrls: ['./main-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAboutComponent extends BaseBlock {

}
