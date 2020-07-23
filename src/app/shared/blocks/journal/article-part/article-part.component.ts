import { Component, Input, OnInit } from '@angular/core';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-article-part',
  templateUrl: './article-part.component.html',
  styleUrls: ['./article-part.component.scss']
})
export class ArticlePartComponent implements OnInit {
  @Input() props: StrMap<string> = {};
  @Input() editor: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
