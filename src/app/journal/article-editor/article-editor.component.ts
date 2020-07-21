import { ChangeDetectionStrategy, Component,  OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleHeaderComponent } from '@shared/blocks/journal/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article } from '../journal.model';

@Component({
  selector: 'r-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent implements OnInit {
  public article: Article;

  @ViewChild(ArticleHeaderComponent) headerComponent: ArticleHeaderComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private journalService: JournalService) {
  }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.article = snapshot.data.article || {
      author_name: 'Валерия Репина',
    };

    if (snapshot.params.id) {
      this.article.slug = snapshot.params.id;
    }
  }

  public $save() {
    const header = this.headerComponent.getValue();
    const article: Article = {
      ...header,
      ...this.article,
    };

    this.journalService.save(article).toPromise();
  }
}
