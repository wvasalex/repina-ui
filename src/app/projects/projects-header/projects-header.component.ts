import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-projects-header',
  templateUrl: './projects-header.component.html',
  styleUrls: ['./projects-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsHeaderComponent extends BaseBlock {



}
