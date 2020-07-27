import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleHeaderComponent } from '@shared/blocks/journal/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article, ArticleContentBlock } from '../journal.model';
import { BlocksRenderComponent } from '@shared/blocks/blocks-render/blocks-render.component';

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
              private changeDetectorRef: ChangeDetectorRef,
              private journalService: JournalService) {
  }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.article = snapshot.data.article || {
      author_name: 'Валерия Репина',
      content_blocks: [
        {
          block_type: 'article-header',
          props: {
            title: 'Колонка Валерии Репиной',
            subtitle: 'Заголовок статьи',
            description: 'Тут краткое содержание статьи',
          },
          content_elements: [],
        },
      ],
    };
    this.article.content_blocks.sort((a: ArticleContentBlock, b: ArticleContentBlock) => {
      return a.position - b.position;
    });
  }

  public $addPart() {
    this.article.content_blocks = [
      ...this.article.content_blocks, {
        block_type: 'article-part',
        props: {
          title: '',
          subtitle: '',
        },
        content_elements: [],
      },
    ];
  }

  public $save() {
    if (!this.article.blog_tag) {
      delete this.article.blog_tag;
    }

    this.article.content_blocks.forEach((block: ArticleContentBlock, index: number) => {
      block.position = index;
    });

    this.journalService.save(this.article).toPromise().then((a) => {
      console.log(a);
    });
  }

}