import { Component, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-service-block',
  templateUrl: './service-block.component.html',
  styleUrls: ['./service-block.component.scss']
})
export class ServiceBlockComponent extends BaseBlock {
  @Input() availableElements: SelectOption[];
}
