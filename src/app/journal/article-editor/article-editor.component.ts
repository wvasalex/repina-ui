import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleHeaderComponent } from '@shared/blocks/journal/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article, ArticleContentBlock, ArticleContentElement } from '../journal.model';

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
    };

    if (!this.article.content_blocks?.length) {
      this.article.content_blocks = [{
        block_type: 'article-header',
        props: {
          title: 'Колонка Валерии Репиной',
          subtitle: 'Заголовок статьи',
          description: 'Тут краткое содержание статьи',
        },
        content_elements: [],
      }];
    }
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

      block.content_elements.forEach((element: ArticleContentElement, elementIndex: number) => {
        element.position = elementIndex;
      });
    });

    this.journalService.save(this.article).toPromise().then((a) => {
      console.log(a);
    });
  }

}
