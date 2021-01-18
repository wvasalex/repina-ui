import { ChangeDetectionStrategy, Component, SimpleChanges } from '@angular/core';
import { JournalService } from '../../journal/journal.service';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-main-articles',
  templateUrl: './main-articles.component.html',
  styleUrls: ['./main-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainArticlesComponent extends BaseBlock {

  constructor(private journalService: JournalService) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.editor.previousValue === false && changes.editor.currentValue === true) {
      this.journalService.getPublished();
    }
  }

}
