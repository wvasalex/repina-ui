import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../journal.model';

@Component({
  selector: 'r-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  public article: Article;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;
  }
}
