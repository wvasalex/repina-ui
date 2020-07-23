import { Component, Input, OnInit } from '@angular/core';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss'],
})
export class ArticleHeaderComponent implements OnInit {
  @Input() props: StrMap<string> = {};
  @Input() editor: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.props);
  }

  public getValue(): StrMap<string> {
    return this.props;
  }
}
