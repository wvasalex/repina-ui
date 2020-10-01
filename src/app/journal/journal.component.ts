import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { Article } from './journal.model';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalComponent implements OnInit {
  public groups: (Article | StrMap<string>)[][];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private journalService: JournalService) { }

  ngOnInit(): void {
    this.journalService.get<Article>().subscribe((articles) => {
      //this.main_articles = articles.splice(0, 2);
      articles.splice(6, 0, {
        type: 'subscribe',
      });
      this.groups = this.journalService.groupArticles(articles);

      this.changeDetectorRef.detectChanges();
    });
  }
}
