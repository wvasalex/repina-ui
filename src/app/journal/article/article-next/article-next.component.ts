import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { Article, BlogTag } from '../../journal.model';
import { JournalService } from '../../journal.service';

@Component({
  selector: 'r-article-next',
  templateUrl: './article-next.component.html',
  styleUrls: ['./article-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleNextComponent extends BaseBlock implements OnInit {

  @Input() tag: BlogTag;
  @Input() article: Article;

  public related$: Observable<Article[]>;

  constructor(private journalService: JournalService) {
    super();
  }

  ngOnInit() {
    this.related$ = this.journalService.getRelevant({
      blog_tag__key__in: this.tag.key,
    }, 4).pipe(
      map((articles: Article[]) => {
        if (this.article) {
          articles = articles.filter((article: Article) => {
            return article.slug !== this.article.slug;
          });
        }
        return articles.slice(0, 3);
      }),
    );
  }

}
