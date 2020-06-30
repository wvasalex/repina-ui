import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-article-part',
  templateUrl: './article-part.component.html',
  styleUrls: ['./article-part.component.scss']
})
export class ArticlePartComponent implements OnInit {
  @Input() date: string;
  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
