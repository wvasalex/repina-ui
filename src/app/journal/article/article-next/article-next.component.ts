import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { Article, BlogTag } from '../../journal.model';
import { JournalService } from '../../journal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'r-article-next',
  templateUrl: './article-next.component.html',
  styleUrls: ['./article-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleNextComponent extends BaseBlock implements OnInit {

  @Input() tag: BlogTag;

  public related$: Observable<Article[]>

  constructor(private journalService: JournalService) {
    super();
  }

  ngOnInit() {
    this.related$ = this.journalService.get({
      blog_tag__key__in: this.tag.key,
      per_page: 3,
    });
  }

}
