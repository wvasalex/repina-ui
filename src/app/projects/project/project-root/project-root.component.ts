import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRootComponent extends BaseBlock {

}