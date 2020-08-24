import { Component, Input } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss']
})
export class ProjectBlockComponent extends BaseBlock {
  @Input() availableElements: SelectOption[];
}
