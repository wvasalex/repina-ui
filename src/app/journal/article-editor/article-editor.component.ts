import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleHeaderComponent } from '../article/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article } from '../journal.model';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent implements OnInit {
  public article: Article;

  public render = this.journalService.render;

  public availableElements: SelectOption[] = [
    { value: 'blank', label: 'Пустой' },
    { value: 'article-text', label: 'Текст' },
    { value: 'article-image', label: 'Изображение' },
    { value: 'article-quote', label: 'Цитата' },
    { value: 'article-author', label: 'Автор' },
    { value: 'article-video', label: 'Видео' },
  ];

  @ViewChild(ArticleHeaderComponent) headerComponent: ArticleHeaderComponent;

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
    });
  }

  public $save() {
    this._save();
  }

  private _save() {
    if (!this.article.title) {
      alert('Название статьи обязательно!');
      return;
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

    const req = this.journalService.save(this.article).toPromise().then((a: Article) => {
      if (a.slug != this.article.slug) {
        this.router.navigate(['/blog', a.slug, 'edit']);
      } else {
        this.article = a;
        this.changeDetectorRef.detectChanges();
      }
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }
}
