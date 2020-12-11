import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { SelectOption } from '@shared/components/select/select.model';
import { ArticleHeaderComponent } from '../article/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article, BlogTag } from '../journal.model';
import { JournalTagsService } from '../journal-tags.service';

@Component({
  selector: 'r-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  public tags$: Observable<SelectOption[]> = this.journalTagsService.get()
    .pipe(map((tags: BlogTag[]) => {
      return tags.map((tag: BlogTag) => {
        return {
          value: tag.id,
          label: tag.title,
        };
      });
    }));

  public article: Article;

  public render = this.journalService.render;

  public availableElements: SelectOption[] = [
    //{value: 'blank', label: 'Пустой'},
    {value: 'article-text', label: 'Текст'},
    {value: 'article-image', label: 'Изображение'},
    {value: 'article-quote', label: 'Цитата'},
    {value: 'article-author', label: 'Автор'},
    {value: 'article-video', label: 'Видео'},
    {value: 'article-request', label: 'Запрос стоимости'},
    {value: 'article-subscribe', label: 'Подписаться'},
  ];

  @ViewChild(ArticleHeaderComponent) headerComponent: ArticleHeaderComponent;

  private _sub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private journalService: JournalService,
    private journalTagsService: JournalTagsService,
    private toasterService: ToasterService,
  ) {
  }

  public ngOnInit(): void {
    this._sub = this.activatedRoute.data.pipe(
      pluck('project'),
    ).subscribe(() => {
      this._init();
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public $addBlock(e: StrMap<any>) {
    const {target, offset} = e;
    const index = this.article.content_blocks.indexOf(target) + offset;

    this.article.content_blocks.splice(index, 0, {
      block_type: 'article-part',
      props: {
        title: '',
        subtitle: '',
      },
      content_elements: [
        {
          element_type: 'blank',
          props: {},
        },
        {
          element_type: 'blank',
          props: {},
        },
      ],
      is_enabled: true,
    });
  }

  public $save() {
    this._save();
  }

  private _save() {
    if (!this.article.title) {
      return this.toasterService.error('Название обязательно!');
    }

    if (!this.article.blog_tag) {
      delete this.article.blog_tag;
    }

    if (this.article.content_blocks[0].content_elements[0]?.content_file) {
      this.article.preview_file = this.article.content_blocks[0].content_elements[0]?.content_file;
    }

    this.article.content_blocks.forEach((block: ContentBlock, index: number) => {
      block.position = index;

      block.content_elements.forEach((element: ContentElement, elementIndex: number) => {
        element.position = elementIndex;

        if (element.hasOwnProperty('content_file')) {
          delete element.content_file;
        }
      });
    });

    // Slug update
    if (this.article._slug) {
      const {slug, _slug} = this.article;
      this.article._slug = slug;
      this.article.slug = _slug;
    }

    const req = this.journalService.save(this.article).toPromise().then((a: Article) => {
      if (this.article.slug != this.article._slug) {
        this.router.navigate(['/blog', a.slug, 'edit']);
      } else {
        this.article = a;
        this.changeDetectorRef.detectChanges();
      }
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }

  private _init(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.article = snapshot.data.article || {
      author_name: 'Валерия Репина',
      _new: true,
    };

    if (this.article.slug) {
      this.article._slug = this.article.slug;
    }

    if (this.article.blog_tag) {
      this.article.blog_tag = this.article.blog_tag['id'];
    }

    if (!this.article.content_blocks?.length) {
      this.article.content_blocks = [
        {
          block_type: 'article-header',
          props: {
            title: 'Колонка Валерии Репиной',
            subtitle: 'Заголовок статьи',
            description: 'Тут краткое содержание статьи',
          },
          content_elements: [
            {
              element_type: 'article-image',
              props: {},
              content_file: null,
            },
          ],
          is_enabled: true,
        },
        {
          block_type: 'article-part',
          props: {
            title: '',
            subtitle: '',
          },
          content_elements: [
            {
              element_type: 'article-text',
              props: {},
            },
            {
              element_type: 'blank',
              props: {},
            },
          ],
          is_enabled: true,
        },
      ];
    }

    this.changeDetectorRef.detectChanges();
  }
}
