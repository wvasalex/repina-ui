import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectsComponent extends BaseBlock {

}
