import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdComponent extends BaseBlock {

  @Input() prop: string;
  @Input() className: string = '';

}
