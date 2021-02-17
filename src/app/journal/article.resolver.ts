import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResolverService } from '@shared/services/api/resolver.service';
import { Article } from './journal.model';
import { JournalService } from './journal.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver extends ResolverService<Article> {
  constructor(public router: Router,
              public service: JournalService) {
    super();
  }
}
