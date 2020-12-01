import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Article } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'r-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {

  public render = this.journalService.render;

  public article$: Observable<Article> = this.activatedRoute.data.pipe(pluck('article'));

  constructor(
    private activatedRoute: ActivatedRoute,
    private journalService: JournalService,
  ) {
  }

  ngOnInit(): void {}

}
