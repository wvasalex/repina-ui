import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Article } from '../../journal.model';

@Component({
  selector: 'r-article-next',
  templateUrl: './article-next.component.html',
  styleUrls: ['./article-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleNextComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
