import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleHeaderComponent } from '@shared/blocks/journal/article-header/article-header.component';
import { JournalService } from '../journal.service';
import { Article } from '../journal.model';
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

    /*this.article.content_blocks = [

      {
        block_type: 'article-part',
        props: {
          title: 'Заголовок',
          subtitle: 'Подзаголовок',
        },
        content_elements: [

        ],
      },
    ];
*/
    if (snapshot.params.id) {
      this.article.slug = snapshot.params.id;
    }
  }

  public $addPart() {
    this.article.content_blocks = [
      ...this.article.content_blocks, {
        block_type: 'article-part',
        props: {
          title: 'Заголовок',
          subtitle: 'Подзаголовок',
        },
        content_elements: [],
      },
    ];

    //this.changeDetectorRef.detectChanges();
  }

  public $save(blocksRenderComponent: BlocksRenderComponent) {
    console.log(blocksRenderComponent.blocks);
    /*const content_blocks = blocks.getValue();
    const article: Article = {
      ...this.article,
      content_blocks,
    };

    console.log(article);*/
    //this.journalService.save(article).toPromise();
  }
}
