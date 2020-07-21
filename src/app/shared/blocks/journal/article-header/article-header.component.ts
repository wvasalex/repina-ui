import { Component, Input, OnInit } from '@angular/core';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss'],
})
export class ArticleHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() editor: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public getValue(): StrMap<string> {
    return {
      'title': this.title,
      'description': this.description,
    };
  }
}
