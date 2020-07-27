import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../journal.model';

@Component({
  selector: 'r-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: Article;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;

    /*this.article.content_blocks = [
      {
        block_type: 'article-header',
        props: {
          title: 'Колонка Валерии Репиной',
          subtitle: 'Заголовок статьи',
          description: 'Тут краткое содержание статьи',
        },
        content_elements: [
        ],
      },
      {
        block_type: 'article-part',
        props: {
          title: 'Заголовок',
          subtitle: 'Задача',
          date: '12-19-2020',
        },
        content_elements: [
          {
            element_type: 'article-text',
            props: {
              value: 'Текстовое содержимое',
            },
          },
          {
            element_type: 'article-text',
            props: {
              value: 'Текстовое содержимое',
            },
          },
        ],
      },
      {
        block_type: 'article-part',
        props: {
          subtitle: 'Задача',
        },
        content_elements: [
          {
            element_type: 'article-text',
            props: {
              value: 'Текстовое содержимое',
            },
          },
          {
            element_type: 'article-text',
            props: {
              value: 'Текстовое содержимое',
            },
          },
        ],
      },
    ];*/
  }
}
