import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Article } from '../journal.model';
import { JournalService } from '../journal.service';
import { FooterService } from '@shared/footer/footer.service';

@Component({
  selector: 'r-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {

  public render = this.journalService.render;

  public article$: Observable<Article> = this.activatedRoute.data.pipe(
    pluck('article'),
    tap((article: Article) => {
      this.footerService.setBreadcrumbs([
        {
          href: '/blog',
          text: 'Журнал',
        },
        {
          href: '/blog/' + article.slug,
          text: article.title,
        },
      ]);
    }),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private journalService: JournalService,
    private footerService: FooterService,
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.footerService.setBreadcrumbs([]);
  }

}
