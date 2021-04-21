import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseBlock } from '@shared/blocks/block.component';
import { JournalTagsService } from '../journal-tags.service';

@Component({
  selector: 'r-journal-header',
  templateUrl: './journal-header.component.html',
  styleUrls: ['./journal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalHeaderComponent extends BaseBlock {

  public tagName$: Observable<string> = combineLatest([
    this.activatedRoute.params,
    this.journalTagsService.tags$,
  ]).pipe(
    map(([params, tags]) => {
      if (!tags?.length || !params.url) {
        return;
      }

      return tags.find((tag) => tag.value === params.url)?.label;
    }),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private journalTagsService: JournalTagsService,
  ) {
    super();
  }

}
