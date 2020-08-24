import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-quote',
  templateUrl: './project-quote.component.html',
  styleUrls: ['./project-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectQuoteComponent extends BaseBlock {

}