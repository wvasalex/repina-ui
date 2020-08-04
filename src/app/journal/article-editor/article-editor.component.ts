import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleHeaderComponent } from '@shared/blocks/journal/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article, ArticleContentBlock, ArticleContentElement } from '../journal.model';
import { of } from 'rxjs';
import { StrMap } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent implements OnInit {
  public article: Article;

  @ViewChild(ArticleHeaderComponent) headerComponent: ArticleHeaderComponent;

  private _lastSync: number = 0;
  private _syncTimeout;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private journalService: JournalService,
              private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.article = snapshot.data.article || {
      author_name: 'Валерия Репина',
    };

    if (!this.article.content_blocks?.length) {
      this.article.content_blocks = [
        {
          block_type: 'article-header',
          props: {
            title: 'Колонка Валерии Репиной',
            subtitle: 'Заголовок статьи',
            description: 'Тут краткое содержание статьи',
          },
          content_elements: [],
        },
        {
          block_type: 'article-part',
          props: {
            title: '',
            subtitle: '',
          },
          content_elements: [],
        },
      ];
    }
  }

  public $addBlock(e: StrMap<any>) {
    const { target, offset } = e;
    const index = this.article.content_blocks.indexOf(target) + offset;

    this.article.content_blocks.splice(index, 0, {
      block_type: 'article-part',
      props: {
        title: '',
        subtitle: '',
      },
      content_elements: [],
    });
  }

  public $save() {
    const now = (new Date()).getTime();

    if (now - this._lastSync < 3000) {
      clearTimeout(this._syncTimeout);
    }

    this._lastSync = now;
    this._syncTimeout = setTimeout(() => {
      this._save();
    }, 2000);
  }

  private _save() {
    if (!this.article.title) {
      return;
    }

    if (!this.article.blog_tag) {
      delete this.article.blog_tag;
    }

    this.article.content_blocks.forEach((block: ArticleContentBlock, index: number) => {
      block.position = index;

      block.content_elements.forEach((element: ArticleContentElement, elementIndex: number) => {
        element.position = elementIndex;
      });
    });

    const req = this.journalService.save(this.article).toPromise().then((a: Article) => {
      if (a.slug != this.article.slug) {
        this.router.navigate(['/blog', a.slug, 'edit']);
      }

      this.article = a;
      this.changeDetectorRef.detectChanges();
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }

}
