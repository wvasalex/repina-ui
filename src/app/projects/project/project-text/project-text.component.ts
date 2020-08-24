import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-text',
  templateUrl: './project-text.component.html',
  styleUrls: ['./project-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTextComponent extends BaseBlock {

}