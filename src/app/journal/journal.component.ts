import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { Article } from './journal.model';

@Component({
  selector: 'r-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalComponent implements OnInit {
  public articles: Article[];
  public main_articles: Article[];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private journalService: JournalService) { }

  ngOnInit(): void {
    this.journalService.get<Article>().subscribe((articles: Article[]) => {
      this.main_articles = articles.splice(0, 2);
      this.articles = articles.splice(2);

      this.changeDetectorRef.detectChanges();
    });
  }

}
