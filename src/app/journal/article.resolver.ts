import { Injectable } from '@angular/core';
import { Article } from './journal.model';
import { JournalService } from './journal.service';
import { ResolverService } from '@shared/services/api/resolver.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver extends ResolverService<Article> {
  constructor(public service: JournalService) {
    super();
  }
}
