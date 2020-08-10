import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleHeaderComponent } from '@shared/blocks/journal/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article, ArticleContentBlock, ArticleContentElement } from '../journal.model';
import { of } from 'rxjs';
import { StrMap } from '@shared/types';
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

  public availableElements: SelectOption[] = [
    { value: 'article-text', label: 'Текст' },
    { value: 'article-image', label: 'Изображение' },
    { value: 'article-quote', label: 'Цитата' },
    { value: 'article-author', label: 'Автор' },
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
        { element_type: 'blank' },
        { element_type: 'blank' },
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

    this.article.content_blocks.forEach((block: ArticleContentBlock, index: number) => {
      block.position = index;

      block.content_elements.forEach((element: ArticleContentElement, elementIndex: number) => {
        element.position = elementIndex;

        if (element.content_file) {
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
