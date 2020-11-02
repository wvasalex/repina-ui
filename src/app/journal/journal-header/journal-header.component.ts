import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-journal-header',
  templateUrl: './journal-header.component.html',
  styleUrls: ['./journal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalHeaderComponent extends BaseBlock {


}
